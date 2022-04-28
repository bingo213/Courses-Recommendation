from flaskserver import db, ma
from flask_marshmallow import fields

class Student(db.Model):
    __tablename__ = 'student'
    id = db.Column(db.String(8), primary_key=True)
    fullName = db.Column(db.String(100))
    dateOfBirth = db.Column(db.DateTime)
    email = db.Column(db.String(50))
    phoneNumber = db.Column(db.String(10))
    className = db.Column(db.String(10))

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