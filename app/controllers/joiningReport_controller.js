/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Designation = mongoose.model('Designation')  
 ,  JoiningReport = mongoose.model('JoiningReport');

/**
* Joining Report Form
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) {  
    if(err)  
      {
        console.log(err);
      }  
    else
      { 
      	res.render('joiningReport/add',{ 
            title: 'Joining Report',
            designations: designations,
            joiningReport: new JoiningReport({}),
            path: req.url
        });
      }
  });
}

/**
* Joining Report Form data save
*/

exports.save = function(req, res) {
  var joiningReport= new JoiningReport(req.body);
  joiningReport.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/joining_report');
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
  	      return res.render('joiningReport/add',{
  	        title: 'Joining Report',
            designations: designations,
  	        joiningReport: joiningReport,
  	        path: req.url,
  	        errors: utils.errors(err.errors || err)
          });
        }
      });
    }
  });  
}
