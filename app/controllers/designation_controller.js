/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  Designation = mongoose.model('Designation');

/**
* Add a new post 
*/

exports.add = function (req, res) {
	res.render('designation/add', { 
    title: 'Add a Designation',
    designation: new Designation({})
  });
}

/**
* save new post details
*/

exports.save = function (req, res) {
var designation = new Designation(req.body);
console.log(designation);
designation.save(function (err,docs) {
  if (!err) 
  {   req.flash('success', 'successfully added a post');
   	  res.redirect('/designation/list');
      console.log('new post details saved successfully');
  }  
  else
  {	
  	res.render('designation/add', {
      title: 'Add a Designation',
      designation: designation,
      errors: utils.errors(err.errors || err)
    });
  	console.log(err);
  }
});
}

//Show List of Designation

exports.show =function(req,res){
Designation.find (function (err,designation) {
  if(err)
    console.error('No data found')
  else
  {
    console.log(designation);
    res.render('designation/show', {
            title: 'Designations',
            designations:designation
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
}

//render edit data page
exports.edit =function(req,res){
      Designation.findById(req.param('_id'),function (err,designation) {
            if(err)
              console.error('Data not Received')
            else
            {   console.log('Data Received')
               res.render('designation/edit',{
                title:'Designations',
                po:designation
           });
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
                  req.flash('warning','Post Name must be Filled and must be max 20 Characters');
                }
               if(err.errors.min_qualification)
                {
                  req.flash('warning','Post Qualification must be Filled and must be max 10 Characters');
                }
               res.redirect('/designation/list');
               console.log(err);
             }
});
 
  });
}
