var res;

var student = function (roll, name, year) {
    var roll = roll;
    var name = name;
    var year = year;
};

var course = function (id ,name) {
    var id = id;
    var name = name;
};

var addNewStudent = function (roll, name, year) {
    var details = "roll=" + roll + "&name=" + name + "&year=" + year;
    $.ajax({
        type: 'POST',
        url:  'http://127.0.0.1:5000/addStudent',
        data: details,
        async: false,
        success: function (status) {
    console.log(status);
    alert(status);
    res = status;
},
        error: function (xhr, status, eThrown) {
    console.log(status);
     alert(status);
    res = status;
},
    });
    return res;
};

var addNewStudent1 = function() {
    var rl = document.getElementById('addNewStudent').megaroll.value;
    var nm = document.getElementById('addNewStudent').meganame.value;
    var yr = document.getElementById('addNewStudent').megayear.value;
    addNewStudent(rl,nm,yr);
}

var addNewCourse = function (id,name) {
    var details = "id=" + id + "&name=" + name;
    $.ajax({
        type: 'POST',
        url:  'http://127.0.0.1:5000/addCourse',
        data: details,
        async: false,
        success:function (status) {
    console.log(status);
     alert(status);
    res =  status;
},
        error: function (xhr, status, eThrown) {
    console.log(status);
     alert(status);
    res = status;
},
    });
    return res;
};

var addNewCourse1 = function() {
    var id = document.getElementById('addNewCourse').classicid.value;
    var name = document.getElementById('addNewCourse').classicname.value;
    console.log(id);
    console.log(name);
    addNewCourse(id,name);
};

var viewAllStudents = function() {
    var result = null;
    $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:5000/students",
        async: false,
        data: {},
        success: function(response) {
            res = response;
             console.log(response);
            allstudents = response["students"];
            $("#allStudents").find("tr:not(:first)").remove();
            $("#student_remove").find("option").remove();
            $("#students").find("option").remove();
            $("#students_display").find("option").remove();

            var addoption = function (id,s) {
                var x = document.getElementById(id);
                var option = document.createElement('option');
                option.text = s.roll;
                x.add(option);
            }

            var tableRef = document.getElementById('allStudents');
            for (var i in allstudents) {
                var newRow = tableRef.insertRow(-1);
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allstudents[i].roll));
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allstudents[i].name));
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allstudents[i].year));
                addoption('students',allstudents[i]);
                addoption('student_remove',allstudents[i]);
                addoption('students_display',allstudents[i]);
            }
        },
        error: function (xhr, status, eThrown) {
    console.log(status);
    res = status;
},     
    });
    return res;
};

var  viewAllCourses = function() {
   var result = null;
   $.ajax({
    type: 'GET',
    url: "http://127.0.0.1:5000/courses",
    async: false,
    data: {},
    success: function(response) {
        res = response;  
        console.log(response);
        allcourses = response["courses"];
        $("#allCourses").find("tr:not(:first)").remove();
        $("#course_remove").find("option").remove();
        $("#courses").find("option").remove();
        $("#courses_display").find("option").remove();

        var addoption = function (id,c) {
            var x = document.getElementById(id);
            var option = document.createElement('option');
            option.text = c.id;
            x.add(option);
        }
        var tableRef = document.getElementById('allCourses');
        for (var i in allcourses) {
            var newRow = tableRef.insertRow(-1);
            var newCell = newRow.insertCell(-1);
            newCell.appendChild(document.createTextNode(allcourses[i].id));
            var newCell = newRow.insertCell(-1);
            newCell.appendChild(document.createTextNode(allcourses[i].name));
            addoption('courses',allcourses[i]);
            addoption('course_remove',allcourses[i]);
            addoption('courses_display',allcourses[i]);
        }
    },
    error: function (xhr, status, eThrown) {
    console.log(status);
    res = status;
    },
});
   return res;
};

var addStudentToCourse = function(roll, id) {
   var details= "roll=" + roll +"&id=" + id;
   $.ajax({
    type: 'POST',
    url:  '	http://127.0.0.1:5000/enroll',
    async: false,
    data: details,
    success: function (status) {
    console.log(status);
     alert(status);
    res = status;
    },
    error: function (xhr, status, eThrown) {
    console.log(status);
     alert(status);
    res = status;
    },
});
   return res;
};

var addStudentToCourseHelper = function() {
    var roll = document.getElementById("students").value;
    var id = document.getElementById("courses").value;
    addStudentToCourse(roll,id);
}

var dropStudentFromCourse = function(roll, id) {
    var details= "roll=" + roll +"&id=" + id;
    $.ajax({
        type: 'POST',
        url:  'http://127.0.0.1:5000/drop',
        async: false,
        data: details,
        success: function (status) {
    console.log(status);
    res = status;
     alert(status);
},
        error: function (xhr, status, eThrown) {
    console.log(status);
    res = status;
     alert(status);
},
    });
    return res;
};

var dropStudentFromCourseHelper = function() {
    var roll = document.getElementById("students").value;
    var id = document.getElementById("courses").value;
    dropStudentFromCourse(roll,id);
}

var removeCourse = function(id){
    var details = "id="+id;
    $.ajax({
        type: 'POST',
        url:  'http://127.0.0.1:5000/deleteCourse',
        data: details,
        async: false,
        success: function(response) {
            res = response;
             alert(response);
             console.log(response);
            viewAllCourses();
        },
        error: function (xhr, status, eThrown) {
    console.log(status);
     alert(status);
    res = status;
},
    });
    return res;
};

var removeCourseRemover = function () {
    var id = document.getElementById('course_remove').value;
    $('option', this).remove();
    function displaymessage() {
        $("select").each(function() { this.selectedIndex = 0 });
    }
    removeCourse(id);
};

var removeStudent =function(roll){
    var details= "roll="+roll;
    $.ajax({
        type: 'POST',
        url:  'http://127.0.0.1:5000/deleteStudent',
        data: details,
        async: false,
        success: function(response) {
            res = response;
             alert(response);
             console.log(response);
             viewAllStudents();
        },
        error: function (xhr, status, eThrown) {
  console.log(status);
   alert(status);
    res = status;
},
    });
    return res;
};

var removeStudentRemover =function () {
    var roll = document.getElementById('student_remove').value;
    $('option', this).remove();
    function displaymessage() {
        $("select").each(function() { this.selectedIndex = 0 });
    }
    removeStudent(roll);
};

var viewEnrolled =function(id){
    var details= "id="+id;
    $.ajax({
        type: 'GET',
        url:  'http://127.0.0.1:5000/studentsEnrolled',
        async: false,
        data: details,
        success: function(response) {
            res = response;
             console.log(response);
            allstudents = response["students"];
            $("#selected_students").find("tr:not(:first)").remove();

            var tableRef = document.getElementById('selected_students');
            for (var i in allstudents) {
                var newRow = tableRef.insertRow(-1);
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allstudents[i].roll));
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allstudents[i].name));
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allstudents[i].year));
            }
        },
        error: function (xhr, status, eThrown) {
    console.log(status);
    res = status;
}, 
    });
    return res;
};

var viewEnrolledHelper =function () {
    var id = document.getElementById('courses_display').value;
    viewEnrolled(id);
};

var viewCoursesTaken = function(roll){
    var details= "roll="+roll;
    $.ajax({
        type: 'GET',
        url:  'http://127.0.0.1:5000/coursesTaken',
        async: false,
        data: details,
        success: function(response) {
            res = response;  
             console.log(response);
            allcourses = response["courses"];
            $("#selected_courses").find("tr:not(:first)").remove();

            var tableRef = document.getElementById('selected_courses');
            for (var i in allcourses) {
                var newRow = tableRef.insertRow(-1);
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allcourses[i].id));
                var newCell = newRow.insertCell(-1);
                newCell.appendChild(document.createTextNode(allcourses[i].name));
            }
        },
        error: function (xhr, status, eThrown) {
    console.log(status);
    res = status;
}, 
    });
    return res;
};

var viewCoursesTakenHelper =function () {
    var roll = document.getElementById("students_display").value;
    viewCoursesTaken(roll);
};


module.exports.student = student;
module.exports.course = course;
module.exports.addNewStudent = addNewStudent;
module.exports.addNewCourse = addNewCourse;
module.exports.addNewCourse1 = addNewCourse1;
module.exports.viewAllStudents = viewAllStudents;
module.exports.viewAllCourses = viewAllCourses;
module.exports.addStudentToCourse = addStudentToCourse;
module.exports.addStudentToCourseHelper = addStudentToCourseHelper;
module.exports.dropStudentFromCourse = dropStudentFromCourse;
module.exports.dropStudentFromCourseHelper = dropStudentFromCourseHelper;
module.exports.removeCourse = removeCourse;
module.exports.removeCourseRemover = removeCourseRemover;
module.exports.removeStudent = removeStudent;
module.exports.removeStudentRemover = removeStudentRemover;
module.exports.viewEnrolled = viewEnrolled;
module.exports.viewEnrolledHelper = viewEnrolledHelper;
module.exports.viewCoursesTaken = viewCoursesTaken;
module.exports.viewCoursesTakenHelper = viewCoursesTakenHelper;
