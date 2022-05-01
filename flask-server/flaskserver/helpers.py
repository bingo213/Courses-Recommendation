from flaskserver import Course, Orientation, Grade, CourseSchema, db, courses_without_data, selective_courses

def get_course_by_id(courseId):
    course = db.session.query(Course.id.label("courseId"), Course.courseName, Orientation.id.label("orientationId"), Orientation.orientationName)\
                .join(Orientation).filter(Course.id == courseId).first()
    course_schema = CourseSchema()
    result = course_schema.dump(course)
    return result

def convert_prediction(prediction):
    course = get_course_by_id(prediction.iid)
    return {"courseId": prediction.iid,\
            "courseName": course["courseName"],\
            "predictedGrade": prediction.est,\
            "orientationId": course["orientationId"],\
            "orientationName": course["orientationName"]}

def calculate_student_average(studentId):
    studentGrade = [student.grade for student in Grade.query.filter_by(studentId=studentId).all()]
    return sum(studentGrade)/len(studentGrade)

def predict_course_having_no_data(studentId):
    averageGrade = calculate_student_average(studentId)
    
    def convert(courseId):
        course = get_course_by_id(courseId)
        return {"courseId": courseId,\
                "courseName": course["courseName"],\
                "predictedGrade": averageGrade,\
                "orientationId": course["orientationId"],\
                "orientationName": course["orientationName"]}
    
    return list(map(convert, courses_without_data))

def get_top_n_predictions(predictions, n, orientationIdList):
    if len(orientationIdList) > 0:
        filterd_courses = [x for x in predictions if x["courseId"] in selective_courses and x["orientationId"] in orientationIdList]
    else:
        filterd_courses = [x for x in predictions if x["courseId"] in selective_courses]
    
    sorted_predictions = sorted([x for x in filterd_courses], key=lambda x: x["predictedGrade"], reverse=True)

    return sorted_predictions[0:n]