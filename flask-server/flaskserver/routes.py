from flaskserver import db, bcrypt, app, Account, Orientation, OrientationSchema, Grade
from flask import request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, get_jwt_identity, get_jwt, jwt_required
from datetime import datetime, timedelta, timezone
import joblib
from os.path import dirname, join, realpath

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

def convert_prediction(prediction):
    return {"course": prediction.iid, "grade": prediction.est}

def calculate_student_average(studentId):
    studentGrade = [student.grade for student in Grade.query.filter_by(studentId=studentId).all()]
    return sum(studentGrade)/len(studentGrade)

def predict_course_having_no_data(studentId):
    averageGrade = calculate_student_average(studentId)
    def convert(courseId):
        return {"course": courseId, "grade": averageGrade}
    
    return list(map(convert, courses_without_data))

def get_top_n_predictions(predictions, n):
    sorted_predictions = sorted([x for x in predictions if x["course"] in selective_courses], key=lambda x: x["grade"], reverse=True)

    return sorted_predictions[0:n]

@app.route("/recommend", methods=["POST"])
@jwt_required()
def recommend_courses():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    grade_pred = [x for x in predictions if x.uid == current_user_id]
    result = list(map(convert_prediction, grade_pred)) + predict_course_having_no_data(current_user_id)
    top_n = get_top_n_predictions(result, 5)

    return jsonify({"studentId": current_user_id, "recommendations": top_n}), 200

# @app.route("/predict", methods=["POST"])
# @jwt_required()
# def predict_courses():
#     # Access the identity of the current user with get_jwt_identity
#     current_user_id = get_jwt_identity()

#     return jsonify({"studentId": current_user_id, "predictions": "top_n"}), 200