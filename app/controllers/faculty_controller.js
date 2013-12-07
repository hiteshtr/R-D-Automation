/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 , async = require('async')
 ,  Faculty = mongoose.model('Faculty')
 ,  Department = mongoose.model('Department')
 ,  Designation = mongoose.model('Designation');

 /**
* Add new Faculty form
*/

exports.add_faculty = function (req, res) {
	 Department.find (function (err,departments) {
		  Designation.find (function (err,designations) {
        res.render('faculty/add',{
	          title: 'Faculty',
            departments:departments,
            designations:designations,
            faculty: new Faculty({})
         });
      });
  });
}

/**
* Faculty details save
*/

exports.save = function (req, res) {
  var faculty=new Faculty(req.body);
  faculty.save(function (err,docs) {
    if(err) 
      { 
        console.log(err);
        Department.find (function (err1,departments) {
          Designation.find (function (err2,designations) {
            return res.render('faculty/add',{
                   title: 'Faculty',
                   departments:departments,
                   designations:designations,
                   faculty:faculty,
                   errors: utils.errors(err.errors || err) 
            });
          });
        });
      }  
    else
      {
        req.flash('success', 'New faculty details have been added successfully.');
        res.redirect('/faculty/list');
        console.log('Faculty details saved successfully');
      }  
  });
}

/**
* show faculty list
*/

exports.show =function(req,res){
  var departments, designations;

  Department.find({}, function (err, result) {
    if (err) {};
    departments = result;
  });

  Designation.find({}, function (err, result) {
    if (err) {};
    designations = result;
  });

  Faculty
    .find()
    .populate('faculty_dept_id')
    .populate('faculty_desig_id')
    .exec(function (err, faculties) {
      if(err)
      {
        return res.render('faculty/show', {
               title: 'Faculty',
               faculties:faculties,
               departments:departments,
               designations:designations,
               errors:utils.errors(err.errors)
        });
      }
      res.render('faculty/show', {
          title: 'Faculty',
          faculties: faculties,
          departments: departments,
          designations: designations
      });
  });
}

/**
* Delete a faculty details from list
*/

exports.delete =function(req,res){
  Faculty.findByIdAndRemove(req.param('_id'),function (err)  {
       if(err)
       {  
          req.flash('errors','not deleted');
          res.redirect('/faculty/list');
          console.log('Data not Removed');
       }
       else
       { 
          req.flash('success','Successfully deleted.');
          res.redirect('/faculty/list');
       }
  });     
}

/**
* Update a faculty details in list
*/

exports.update =function(req,res){
  Faculty.findById(req.body._id,function (err,docs){   
    docs.faculty_name = req.body.faculty_name;
    docs.faculty_dept_id = req.body.faculty_dept_id;
    docs.faculty_desig_id = req.body.faculty_desig_id;

    docs.save(function (err) {
     if(err) 
     {     
        if(err.errors.faculty_name)
        {
          req.flash('errors',err.errors.faculty_name.message);
        }
        if(err.errors.faculty_dept_id)
        {
          req.flash('errors',err.errors.faculty_dept_id.message);
        }
        if(err.errors.faculty_desig_id)
        {
          req.flash('errors',err.errors.faculty_desig_id.message);
        }
       return res.redirect('/faculty/list');        
       console.log('not saved');
       console.log(err);     
     }  
     else
     {   
        req.flash('success', 'Faculty details updated successfully');
        res.redirect('/faculty/list');
        console.log('updated successfully');
     }
   
    });
  });
}