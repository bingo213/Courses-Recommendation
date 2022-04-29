from flaskserver import db, bcrypt, app, Account, Orientation, OrientationSchema, Grade, Course, StudentSchema, Student, GradeSchema
from flask import request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, get_jwt_identity, get_jwt, jwt_required
from datetime import datetime, timedelta, timezone
import joblib
from os.path import dirname, join, realpath
from marshmallow import ValidationError

with open(
    join(dirname(realpath(__file__)), "predict_model.pkl"), "rb"
) as f:
    model = joblib.load(f)

with open(
    join(dirname(realpath(__file__)), "predictions.pkl"), "rb"
) as f:
    predictions = joblib.load(f)

selective_courses = ['INT3105', 'INT3110', 'INT3117', 'INT3133', 'INT3217',
        'INT3122', 'INT3306', 'INT3505', 'INT3111', 'INT3206', 'INT3213', 'INT3307',
        'INT3301', 'INT3136', 'INT3402', 'INT3407', 'INT3405', 'INT3406', 'INT3411', 
        'INT3413', 'INT3512', 'INT3409', 'INT3121', 'INT3403', 'INT3404', 'INT3412', 
        'INT3108', 'INT3135', 'INT3136', 'INT3123', 'INT3138', 'INT2041', 'INT3137']

courses_without_data = ['INT3108', 'INT3135', 'INT3136', 'INT3123', 'INT3138', 'INT2041', 'INT3137', 'BSA2001', 'BSA2006', 'ELT2031']

def get_orientation_by_course_id(courseId):
    orientationId = Course.query.filter_by(id=courseId).first().orientation
    orientation = Orientation.query.filter_by(id=orientationId).first()
    orientation_schema = OrientationSchema()
    result = orientation_schema.dump(orientation)
    return result

def convert_prediction(prediction):
    orientation = get_orientation_by_course_id(prediction.iid)
    return {"course": prediction.iid, "grade": prediction.est, "orientationId": orientation["id"], "orientationName": orientation["orientationName"]}

def calculate_student_average(studentId):
    studentGrade = [student.grade for student in Grade.query.filter_by(studentId=studentId).all()]
    return sum(studentGrade)/len(studentGrade)

def predict_course_having_no_data(studentId):
    averageGrade = calculate_student_average(studentId)
    
    def convert(courseId):
        orientation = get_orientation_by_course_id(courseId)
        return {"course": courseId, "grade": averageGrade,  "orientationId": orientation["id"], "orientationName": orientation["orientationName"]}
    
    return list(map(convert, courses_without_data))

def get_top_n_predictions(predictions, n, orientationIdList):
    if len(orientationIdList) > 0:
        filterd_courses = [x for x in predictions if x["course"] in selective_courses and x["orientationId"] in orientationIdList]
    else:
        filterd_courses = [x for x in predictions if x["course"] in selective_courses]
    
    sorted_predictions = sorted([x for x in filterd_courses], key=lambda x: x["grade"], reverse=True)

    return sorted_predictions[0:n]

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Account.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        response = jsonify({"msg": "login successful"})
        access_token = create_access_token(identity=user.userId)
        set_access_cookies(response, access_token)
        return {"msg": "login successful", "token": access_token, "avatar": user.avatar}, 200

    return {"msg": "username or password is wrong"}, 400

@app.route("/logout", methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route('/orientations', methods=["GET"])
def get_orientations():
    orientations = Orientation.query.all()
    orientations_schema = OrientationSchema(many=True)
    output = orientations_schema.dump(orientations)
    return {"msg": "Get all orientations successful", "orientations": output}, 200

@app.route("/recommend", methods=["POST"])
@jwt_required()
def recommend_courses():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    numberOfCourses = request.json.get("numberOfCourses", None)
    orientations = request.json.get("orientations", [])

    if numberOfCourses is None:
        return {"msg": "Number of courses is required"}, 400
    if numberOfCourses > 20:
        return {"msg": "Number of courses is greater than the allowed number"}, 400
    if numberOfCourses < 1:
        return {"msg": "Number of courses is less than allowed number"}, 400

    grade_pred = [x for x in predictions if x.uid == current_user_id]
    result = list(map(convert_prediction, grade_pred)) + predict_course_having_no_data(current_user_id)
    top_n = get_top_n_predictions(result, numberOfCourses, orientations)

    return {"studentId": current_user_id, "recommendations": top_n}, 200

@app.route("/predict", methods=["POST"])
@jwt_required()
def predict_courses():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    courses = request.json.get("courses", [])
    if len(courses) == 0:
        return {"msg": "List of courses is required"}, 400
    
    predictions = []
    for id in courses:
        predictions.append(model.predict(current_user_id, id))
    result = list(map(convert_prediction, predictions))

    return jsonify({"studentId": current_user_id, "predictions": result}), 200

@app.route("/account", methods=["GET", "PATCH"])
@jwt_required()
def setting_account():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    if request.method == "GET":
        user = Student.query.filter_by(id=current_user_id).first()
        student_schema = StudentSchema()
        result = student_schema.dump(user)
        return jsonify({"msg": "Get information of student successful", "student": result}), 200

    data = request.json
    studen_schema = StudentSchema()
    try: 
        student = Student(studen_schema.load(data))
        db.session.query(Student).filter(Student.id==current_user_id).update(data)
        db.session.commit() 
        return jsonify(msg='Student updated successfully', user_id="student[id]"), 200   
    except ValidationError as exception_message: 
        return jsonify(error='{}'.format(exception_message)), 400

@app.route("/grade", methods=["GET"])
@jwt_required()
def get_all_grades():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    grade = db.session.query(Grade.grade, Grade.courseId, Course.courseName).join(Course).filter(Grade.studentId == current_user_id).all()
    grade_schema = GradeSchema(many=True)
    re = grade_schema.dump(grade)

    return jsonify({"msg": re}), 200
