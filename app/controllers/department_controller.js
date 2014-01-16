/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Faculty = mongoose.model('Faculty')
 ,  Department = mongoose.model('Department');


 /**
* Add new Department
*/


exports.add_department = function (req, res) {
	res.render('department/add_department',{ 
     title: 'Add Department',
     department:new Department({}),
     path:req.url
  });
}


/**
* Save Department name
*/

exports.save = function (req, res) {
  var department = new Department(req.body);
  department.save(function (err,docs) {
      if (!err) 
      {    
        req.flash('success', 'Department added successfully.');
       	res.redirect('/department/list');
      }  
      else
      {	
        Department.find(function (err1,departments) {
         if(err1)
          console.error('No data found')
         else
         {
      	  res.render('department/show',{
                  title: 'Add Department',
                  department: department,
                  departments: departments,
                  path: req.url,
                  errors: utils.errors(err.errors || err)
               });
      	console.log(err); 	
        }
      });
    }
  });
}


/**
* show department list
*/

exports.show =function(req,res){
  Department.find(function (err,departments) {
    if(err)
      console.error('No data found')
    else
    {
      res.render('department/show', {
              title: 'Departments',
              departments: departments,
              path: req.url
      });
    }
  });
}


/**
*delete a data from list
*/

exports.destroy =function(req,res){
Department.findByIdAndRemove(req.param('_id'),function (err)  {
    if(err)
    {
        req.flash('errors','not deleted');
        console.log(err);
    }
    else
    { 
      req.flash('success','Department deleted successfully.');
      res.redirect('/department/list');
    }
 });
Faculty.remove({faculty_dept_id:req.param('_id')},function (err)  {
      if(err)
    {
        req.flash('errors','not deleted');
        console.log(err);
    }
    else
    { 
      req.flash('success','faculty deleted successfully.');
      res.redirect('/department/list');
    }
 });

  
}


/**
*save updated info
*/

exports.update =function(req,res){
  Department.findById(req.body._id,function (err,docs){   
    docs.department_name = req.body.department_name;

    docs.save(function (err) {
       if(err) 
       {     
          if(err.errors.department_name)
          {
            req.flash('errors',err.errors.department_name.message);
          }
          return res.redirect('/department/list');        
          console.log(err);     
       }  
       else
       {   
          req.flash('success', 'Department name updated successfully.');
          res.redirect('/department/list');
       }   
    });
  });
}  
 