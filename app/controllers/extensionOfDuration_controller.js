/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Designation = mongoose.model('Designation')  
 ,  ExtensionDuration = mongoose.model('ExtensionDuration');
 
/**
* ExtensionOfDuration Form
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) {
    res.render('extensionOfDuration/add',{ 
        title: 'Request for Extension of Duration of Project Employee',
        designations: designations,
        extensionDuration: new ExtensionDuration({}),
        path: req.url
    });
  });
}

/**
* ExtensionOfDuration Form data save
*/

exports.save = function(req, res) {
  var extensionDuration= new ExtensionDuration(req.body);
  extensionDuration.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/extension_of_duration_of_project_employee');
    }
    else
    {
      console.log(err);
      Designation.find (function (err1,designations) {
        return res.render('extensionOfDuration/add',{
          title: 'Request for Extension of Duration of Project Employee',
          extensionDuration: extensionDuration,
          designations: designations,
          path: req.url,
          errors: utils.errors(err.errors || err)
        });
      });
    }
  });  
}