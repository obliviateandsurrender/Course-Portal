from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, make_response
from app import db
from flask_cors import CORS
from app.students.models import Student
from app.enrolment.models import Enrolment

mod_students = Blueprint('students', __name__)
CORS(mod_students)

@mod_students.route('/students', methods=['GET'])
def get_all_students():
    students = Student.query.all()
    studentList = {'students' : []}
    enrolled = Enrolment.query.all()
    for s in students:
        courses=[]
        for e in enrolled:
            if (e.roll == s.roll):
                courses.append(e.code)
        #course = s.courses.strip(' ')
        studentList['students'].append({"roll":s.roll, "name":s.name, "year":s.year, "courses":courses})

    return jsonify(studentList)

@mod_students.route('/addStudent', methods=['POST'])
def add_student():
    roll = request.form["roll"]
    name = request.form["name"]
    year = request.form["year"]
    if (roll == '' or name == '' or year == ''):
        return make_response('error: Fill all the fields!', 400, None)
    elif (Student.query.filter(Student.roll==roll).all()):
        make_response('error: Student Already Added!', 400, None)
    else:
        try:
            student = Student(roll, name, year)
            db.session.add(student)
            db.session.commit()
            return make_response("success: Succesfully, created a student", 200, None)
        except:
            return make_response("error: Couldn't create a student", 400, None)
