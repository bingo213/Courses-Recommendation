from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hardsecretkey'
CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}})

#SqlAlchemy Database Configuration With MySql
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:21032000@localhost/course_recommend?charset=utf8'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

from flaskserver.models import Account, Course, Student, Grade, Orientation, OrientationSchema,\
                                StudentSchema, GradeSchema, AccountSchema, CourseSchema

db.create_all()
db.session.commit()

# from flaskserver.routes import login, logout, get_orientations, recommend_courses,\
#                                 predict_courses, setting_account, update_password, get_all_grades

from flaskserver.routes import setting_account