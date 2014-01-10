/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  DisbursementHonorarium = mongoose.model('DisbursementHonorarium');

/**
* Disbursement Honorarium Form
*/

exports.add = function (req, res) {
	res.render('disbursementHonorarium/add',{ 
      title: 'Disbursement of honorarium from Consultancy Project ',
      disbursementhonorarium: new DisbursementHonorarium({}),
      path: req.url
  });
}

/**
* Disbursement Honorarium Form data save
*/

exports.save = function(req, res) {
  var disbursementhonorarium = new DisbursementHonorarium(req.body);
  disbursementhonorarium.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/disbursement_honorarium');
    }
    else
    {
      console.log(err);
      return res.render('disbursementHonorarium/add',{
        title: 'Disbursement of honorarium from Consultancy Project ',
        disbursementhonorarium: disbursementhonorarium,
        path: req.url,
        errors: utils.errors(err.errors || err)
      });
    }
  });  
}
