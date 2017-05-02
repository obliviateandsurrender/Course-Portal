from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, make_response
from app import db
from flask_cors import CORS
from app.enrolment.models import Enrolment
from app.courses.models import Course
from app.students.models import Student


mod_report = Blueprint('report', __name__)
CORS(mod_report)
# Your controllers here
@mod_report.route('/enroll', methods=['POST'])
def enroll():
    roll = request.form["roll"]
    code = request.form["id"]
    students = Student.query.all()
    enrolled = Enrolment.query.all()
#    for s in students:
#        for e in enrolled:
#            if (e.roll == s.roll):
#                if(e.code == code):
#                    return make_response("error: Course already added!",400, None)
    if (roll == '' or code == ''):
        return make_response("error: Fill all the fields", 400, None)
#    elif (Enrolment.query.filter(Enrolment.roll==roll).all() and Enrolment.query.filter(Enrolment.code==code).all()):
#        return make_response("error: Course already alloted!",400, None)
    else:
        try:
            #for s in students:
            #    for e in enrolled:
            #        if (e.roll == s.roll):
            #            if(e.code == code):
            #                return make_response("error: Course already added!",400, None)
            student=Student.query.filter(Student.roll==roll).all()
            enrolment = Enrolment(roll, code)
            db.session.add(enrolment)
            db.session.commit()
            
            #print(student.courses)             
            #print(student)       
            return make_response("success: Student successfully enrolled!", 200, None)
        except:
            return make_response("error: Oops, Student couldn't be enrolled!", 400, None)
