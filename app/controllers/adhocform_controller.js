/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  AdhocAppointment = mongoose.model('AdhocAppointment');

/**
* Adhoc Form
*/

exports.add = function (req, res) {
	res.render('adhoc/add',{ 
      title: 'Request for Ad-hoc Appointment',
      adhoc: new AdhocAppointment({}),
      path: req.url
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
       if(err.code==11000)
        {
         req.flash('errors','email id is already registered..!!');
         res.redirect('/adhoc');
        }

      else
      {   
        console.log(err);
        return res.render('adhoc/add',{
            title: 'Request for Ad-hoc Appointment',
            adhoc: adhoc,
            path: req.url,
            errors: utils.errors(err.errors || err)

        });
      }
    }
  });
  
};


