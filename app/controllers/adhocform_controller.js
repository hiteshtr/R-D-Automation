/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Designation = mongoose.model('Designation') 
 ,  AdhocAppointment = mongoose.model('AdhocAppointment');

/**
* Adhoc Form
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) { 
    if(err)  
      {
        console.log(err);
      }  
    else
      { 
      	res.render('adhoc/add',{ 
            title: 'Request for Ad-hoc Appointment',
            adhoc: new AdhocAppointment({}),
            designations: designations,
            path: req.url
        });
      }
  });
}

/**
* Adhoc Form data Save
*/

exports.save = function(req, res) {
  var adhoc= new AdhocAppointment(req.body);
  adhoc.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/adhoc');
    }
    else
    {
       console.log(err);
       console.log(err.code);
       if(err.code===11000)
        {
         req.flash('errors','email id is already registered..!!');
         res.redirect('/adhoc');
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
            return res.render('adhoc/add',{
                title: 'Request for Ad-hoc Appointment',
                adhoc: adhoc,
                designations: designations,
                path: req.url,
                errors: utils.errors(err.errors || err)
            });
          }
        });
      }
    }
  });  
};


