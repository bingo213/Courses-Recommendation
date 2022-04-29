from flaskserver import db, ma
from marshmallow import post_load, fields

class Student(db.Model):
    __tablename__ = 'student'
    id = db.Column(db.String(8), primary_key=True)
    fullName = db.Column(db.String(100))
    dateOfBirth = db.Column(db.DateTime)
    email = db.Column(db.String(50))
    phoneNumber = db.Column(db.String(10))
    className = db.Column(db.String(10))

    def __init__(self, fullName=None, dateOfBirth=None, email=None, phoneNumber=None, className=None):
        if fullName is not None:
            self.fullName = fullName
        if dateOfBirth is not None:
            self.dateOfBirth = dateOfBirth
        if email is not None:
            self.email = email
        if phoneNumber is not None:
            self.phoneNumber = phoneNumber
        if className is not None:
            self.className = className

class Account(db.Model):
    __tablename__ = 'account'
    username = db.Column(db.String(20), unique=True, index=True, nullable=False, primary_key=True)
    userId = db.Column(db.String(8), db.ForeignKey('student.id'), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    avatar = db.Column(db.String(500))

class Course(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.String(10), primary_key=True)
    courseName = db.Column(db.String(100), nullable=False)
    orientation = db.Column(db.String(100), db.ForeignKey('orientation.id'))

class Orientation(db.Model):
    __tablename__ = 'orientation'
    id = db.Column(db.String(10), primary_key=True)
    orientationName = db.Column(db.String(100), nullable=False)

class Grade(db.Model):
    __tablename__ = 'grade'
    studentId = db.Column(db.String(8), db.ForeignKey('student.id'), nullable=False, primary_key=True)
    courseId = db.Column(db.String(10), db.ForeignKey('course.id'), nullable=False, primary_key=True)
    grade = db.Column(db.Float)


class OrientationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'orientationName')

class StudentSchema(ma.Schema):
    fullName = ma.String(validate=lambda x: 8 < len(x) < 100)
    email = ma.Email()
    phoneNumber = ma.String()
    dateOfBirth = ma.DateTime()

    class Meta:
        fields = ('id', 'fullName', 'dateOfBirth', 'email', 'phoneNumber', 'className')

    @post_load
    def make_student(self, data, **kwargs):
        return Student(**data)

class GradeSchema(ma.Schema):
    class Meta:
        fields = ("courseId", "courseName", "grade")
