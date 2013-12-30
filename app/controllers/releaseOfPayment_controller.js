/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  ReleaseOfPayment = mongoose.model('ReleaseOfPayment');

/**
* ReleaseOfPayment Form
*/

exports.add = function (req, res) {
  res.render('releaseOfPayment/add',{ 
      title: 'Request for Release of Payment for Students ',
      releaseOfPayment: new ReleaseOfPayment({}),
      path: req.url
  });
}

/**
* ReleaseOfPayment Form data save
*/

exports.save = function(req, res) {
  var releaseOfPayment= new ReleaseOfPayment(req.body);
  releaseOfPayment.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/release_of_payment_for_students');
    }
    else
    {
      console.log(err);
      return res.render('releaseOfPayment/add',{
        title: 'Request for Release of Payment for Students ',
        releaseOfPayment: releaseOfPayment,
        path: req.url,
        errors: utils.errors(err.errors || err)
      });
    }
  });  
}