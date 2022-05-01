from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv, dotenv_values
import os

load_dotenv()

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

#SqlAlchemy Database Configuration With MySql
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS")

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=100)

from flaskserver.models import Account, Course, Student, Grade, Orientation, OrientationSchema,\
                                StudentSchema, GradeSchema, AccountSchema, CourseSchema

db.create_all()
db.session.commit()

from flaskserver.routes import login, logout, get_orientations, recommend_courses, get_all_courses,\
                                predict_courses, setting_account, update_password, get_all_grades
