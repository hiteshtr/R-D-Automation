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

  async.parallel([
        function(callback){
          Department.find({}, function (err, departments) {
            if (err) {
              callback(err, null);
            };
            callback(null, departments);
          });
        },
        function(callback){
          Designation.find({}, function (err, designations) {
            if (err) {
              callback(err, null);
            };
            callback(null, designations);
          });
        }
  ], function (err, results){
      if (err) {
        res.render('users/index', {
          path: req.url,
          errors: utils.errors(err.errors)
        });
      };
      res.render('faculty/add',{
        title: 'Faculty',
        departments:results[0],
        designations:results[1],
        faculty: new Faculty({}),
        path:req.url
      });
  });   
  
}

/**
* Faculty details save
*/

exports.save = function (req, res) {
  var faculty = new Faculty(req.body);
    async.parallel([
      function(callback){
        Department.find({}, function (err, departments) {
          if (err) {
            callback(err, null);
          };
          callback(null, departments);
        });
      },
      function(callback){
        Designation.find({}, function (err, designations) {
          if (err) {
            callback(err, null);
          };
          callback(null, designations);
        });
      }
    ], function (err, results){
       if (err) {
          res.render('users/index', {
            path: req.url,
            errors: utils.errors(err.errors)
          });
        };

    faculty.save(function (err,docs) {
      if(err) 
        { 
          console.log(err);
          Faculty
          .find()
          .populate('faculty_dept_id')
          .populate('faculty_desig_id')
          .exec(function (err1, faculties) {
            if(err1)
            {
              return res.render('users/index', {
                     path:req.url,
                     errors:utils.errors(err.errors)
              });
            }
            else
            {
              return res.render('faculty/show',{
                     title: 'Faculty',
                     departments:results[0],
                     designations:results[1],
                     faculties: faculties,
                     faculty:faculty,
                     path:req.url,
                     errors: utils.errors(err.errors || err)             
              });
            }
          });
        }  
      else
        {
          req.flash('success', 'New faculty details have been added successfully.');
          res.redirect('/faculty/list');
        }  
    });
  });
}

/**
* show faculty list
*/

exports.show =function(req,res){

  async.parallel([
      function(callback){
        Department.find({}, function (err, departments) {
          if (err) {
            callback(err, null);
          };
          callback(null, departments);
        });
      },
      function(callback){
        Designation.find({}, function (err, designations) {
          if (err) {
            callback(err, null);
          };
          callback(null, designations);
        });
      }
    ], function (err, results){
       if (err) {
          res.render('users/index', {
            path: req.url,
            errors: utils.errors(err.errors)
          });
        };
  Faculty
    .find()
    .populate('faculty_dept_id')
    .populate('faculty_desig_id')
    .exec(function (err, faculties) {
      if(err)
      {
        return res.render('users/index', {
               path:req.url,
               errors:utils.errors(err.errors)
        });
      }
      else
      {
        res.render('faculty/show', {
            title: 'Faculty',
            faculty: new Faculty({}),
            faculties: faculties,
            departments: results[0],
            designations: results[1],
            path:req.url
        });
      }
    });
  });
}

/**
* Delete a faculty details from list
*/

exports.destroy =function(req,res){
  Faculty.findByIdAndRemove(req.param('_id'),function (err)  {
       if(err)
       {  
          req.flash('error','not deleted');
          res.redirect('/faculty/list');
          console.log(err);
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
  Faculty.findById(req.body._id,function (err1,docs){   
    docs.faculty_name = req.body.faculty_name;
    docs.faculty_dept_id = req.body.faculty_dept_id;
    docs.faculty_desig_id = req.body.faculty_desig_id;
    docs.faculty_email = req.body.faculty_email;
    console.log(err1);
    docs.save(function (err,docs) {
     if(err) 
     {  console.log(err);    
        if(err.errors.faculty_name)
        {
          req.flash('error',err.errors.faculty_name.message);
        }
        if(err.errors.faculty_dept_id)
        {
          req.flash('error',err.errors.faculty_dept_id.message);
        }
        if(err.errors.faculty_desig_id)
        {
          req.flash('error',err.errors.faculty_desig_id.message);
        }
        if(err.errors.faculty_email)
        {
          req.flash('error',err.errors.faculty_email.message);
        }
        req.flash('error','Faculty details not updated');
        res.redirect('/faculty/list');        
           
     }  
     else
     {   
        req.flash('success', 'Faculty details updated successfully');
        res.redirect('/faculty/list');
     }
   
    });
  });
}