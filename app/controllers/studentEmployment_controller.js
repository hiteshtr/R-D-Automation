/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Department = mongoose.model('Department')
 ,  StudentEmployment = mongoose.model('StudentEmployment');

/**
* Student employment in Projects Form
*/

exports.add = function (req, res) {
  Department.find (function (err,departments) {
  	res.render('studentEmployment/add',{ 
        title: 'Request for Employment of Students in Projects ',
        students: new StudentEmployment({}),
        departments: departments, 
        path: req.url
    });
  });
}

/**
* Student employment in Project  data Save
*/

exports.save = function(req, res) {
  var students= new StudentEmployment(req.body);
  students.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/student_employment');
    }
    else
    {
      console.log(err); 
      Department.find (function (err1,departments) {
        return res.render('studentEmployment/add',{
              title: 'Request for Employment of Students in Projects',
              students: students,
              departments: departments,
              path: req.url,
              errors: utils.errors(err.errors || err)
        });
      });
    }
  });
};


