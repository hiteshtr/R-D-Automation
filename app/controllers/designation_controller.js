/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  Faculty = mongoose.model('Faculty')
 ,  Designation = mongoose.model('Designation');

/**
* Add a new post 
*/

exports.add = function (req, res) {
	res.render('designation/add', { 
    title: 'Add a Designation',
    designation: new Designation({}),
    path:req.url
  });
}

/**
* save new post details
*/

exports.save = function (req, res) {
var designation = new Designation(req.body);
  designation.save(function (err,docs) {
    if (!err) 
    {   req.flash('success', 'successfully added a post');
     	  res.redirect('/designation/list');
        console.log('new post details saved successfully');
    }  
    else
    {	
      Designation.find (function (err1,designations) {
        if(err1)
        {
          console.log(err1);
        }
        else
        {
        	res.render('designation/show', {
            title: 'Add a Designation',
            designation: designation,
            designations: designations,
            path: req.url,
            errors: utils.errors(err.errors || err)
          });
        	console.log(err);
        }
      })
    }
  });
}

//Show List of Designation

exports.show =function(req,res){
  Designation.find (function (err,designations) {
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render('designation/show', {
              title: 'Designations',
              designation: new Designation({}),
              designations: designations,
              path: req.url
      });    
    }
  });
}

//Delete Entry from posts collection

exports.destroy =function(req,res){
Designation.findByIdAndRemove(req.param('_id'),function (err)  {
    if(err)
    {
        req.flash('errors','not deleted');
        console.error('Data not Removed');
    }
    else
    { 
      req.flash('success','successfully deleted');
      res.redirect('/designation/list');
    }
 });
Faculty.update({faculty_desig_id:req.param('_id')},{ $set: { faculty_desig_id: null }},function (err)  {
    if(err)
    {
        req.flash('errors','not deleted');
        console.error('Data not Removed');
    }
    else
    { 
      req.flash('success','successfully deleted');
      res.redirect('/designation/list');
    }
 });
}


//save updated info
exports.update =function(req,res){
  Designation.findById(req.body._id, function (err, docs) { 
    docs.designation_name = req.body.designation_name;
    docs.designation_type = req.body.designation_type;
    docs.min_qualification = req.body.min_qualification;
    docs.staff_type = req.body.staff_type;
    docs.min_experience = req.body.min_experience   
    docs.save(function (err) {
             if (!err) 
             {   req.flash('success', 'successfully updated');
                 res.redirect('/designation/list');
             }  
             else
             {
               req.flash('errors', 'not saved');    
               if(err.errors.designation_name)
                {
                  req.flash('error','Designation Name must be Filled.');
                }
               if(err.errors.min_qualification)
                {
                  req.flash('error','Minimum Qualification must be Filled.');
                }
               res.redirect('/designation/list');
               console.log(err);
             }
    }); 
  });
}
