/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Designation = mongoose.model('Designation') 
 ,  ShortTermConsultant = mongoose.model('ShortTermConsultant');

/**
* Students in Projects Form
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) {  
    if(err)
    {
      console.log(err);
    }
    else
    {
    	res.render('shortTermConsultant/add',{ 
          title: 'Request for engaging short-term Consultants ',
          shortTerm: new ShortTermConsultant({}),
          designations: designations,
          path: req.url
      });
    }
  });
}

/**
* Students in Project Form data Save
*/

exports.save = function(req, res) {
  var shortTerm= new ShortTermConsultant(req.body);
  shortTerm.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/short_term_consultant');
    }
    else
    {
      console.log(err); 
      Designation.find (function (err1,designations) {   
        if(err1)  
        {
          console.log(err1);
        }  
        else
        { 
         return res.render('shortTermConsultant/add',{
              title: 'Request for engaging short-term Consultants ',
              shortTerm: shortTerm,
              designations: designations,
              path: req.url,
              errors: utils.errors(err.errors || err)

          });
        }
      });
    }
  });
};


