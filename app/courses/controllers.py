from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, make_response
from app import db
from flask_cors import CORS
from app.courses.models import Course

mod_courses = Blueprint('courses', __name__)
CORS(mod_courses)
@mod_courses.route('/courses', methods=['GET'])
def get_all_courses():
    courses = Course.query.all()
    courseList= {"courses": []}
    for c in courses:
        courseList["courses"].append({"id": c.code, "name": c.name})
    return jsonify(courseList)

@mod_courses.route('/addCourse', methods=['POST'])
def add_course():
    code = request.form['id']
    name = request.form['name']

    if (code == '' or name == ''):
        return make_response('error: Fill all the fields!', 400, None)
    elif (Course.query.filter(Course.code==code).all()):
        return make_response('error: Course already added!', 400, None)
    try:
        course = Course(code, name)
        db.session.add(course)
        db.session.commit() 
        return make_response('success: Created a course!', 200, None)
    except:
        return make_response('error: Enter the valid values!', 400, None)
