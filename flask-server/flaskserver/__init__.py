from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hardsecretkey'

#SqlAlchemy Database Configuration With MySql
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:21032000@localhost/course_recommend?charset=utf8'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from flaskserver.models import Account, Course, Student, Grade

db.create_all()
db.session.commit()