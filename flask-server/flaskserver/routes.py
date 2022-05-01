from flaskserver import db, app, bcrypt, Account, Orientation, OrientationSchema, Grade, Course,\
                        StudentSchema, Student, GradeSchema, AccountSchema, CourseSchema,\
                        get_course_by_id, get_top_n_predictions, predict_course_having_no_data,\
                        calculate_student_average, convert_prediction, selective_courses, courses_without_data,\
                        model, predictions
from flask import request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required,\
                                unset_jwt_cookies, get_jwt_identity, get_jwt
from datetime import datetime, timedelta, timezone
from marshmallow import ValidationError

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Account.query.filter_by(username=username).first()

    if user and user.check_password(password):
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

    numberOfCourses = int(request.json.get("numberOfCourses", None))
    orientations = request.json.get("orientations", [])
    print(numberOfCourses)

    if numberOfCourses is None:
        return {"msg": "Number of courses is required"}, 400
    if numberOfCourses > 32:
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

@app.route("/profile", methods=["GET", "PATCH"])
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
    student_schema = StudentSchema()
    try: 
        student = Student(student_schema.load(data))
        db.session.query(Student).filter(Student.id==current_user_id).update(data)
        db.session.commit() 
        return jsonify(msg="Student updated successfully", studentId=current_user_id), 200   
    except ValidationError as exception_message: 
        return jsonify(error='{}'.format(exception_message)), 400

@app.route("/password", methods=["PATCH"])
@jwt_required()
def update_password():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    password = request.json.get("password", None)
    if password is None:
        return {"msg": "Password cannot be null"}, 400

    account_schema = AccountSchema()
    try: 
        account = Account(account_schema.load({"password": password}))
        db.session.query(Account).filter(Account.username==current_user_id)\
                    .update({"password": bcrypt.generate_password_hash(password).decode("utf8")})
        db.session.commit() 
        return jsonify(msg='Password updated successfully', studentId=current_user_id), 200   
    except ValidationError as exception_message: 
        return jsonify(error='{}'.format(exception_message)), 400

@app.route("/grade", methods=["GET"])
@jwt_required()
def get_all_grades():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    grade = db.session.query(Grade.grade, Grade.courseId, Course.courseName)\
                        .join(Course)\
                        .filter(Grade.studentId == current_user_id)\
                        .all()
    grade_schema = GradeSchema(many=True)
    result = grade_schema.dump(grade)
    return jsonify(msg="Get all grades successful", grades=result, gradeAverage=calculate_student_average(current_user_id)), 200

@app.route("/courses", methods=["GET"])
def get_all_courses():
    courses = db.session.query(Course.id.label("courseId"), Course.courseName).all()
    course_schema = CourseSchema(many=True)
    result = course_schema.dump(courses)
    return jsonify(msg="Get all courses successful", courses=result)
