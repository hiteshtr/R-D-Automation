/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  PurchaseCommittee = mongoose.model('PurchaseCommittee');

/**
* Purchase Committee Form
*/

exports.add = function (req, res) {
	res.render('purchaseCommittee/add',{ 
      title: 'Purchase Committee',
      purchase: new PurchaseCommittee({}),
      path: req.url
  });
}

/**
* Purchase Committee Form data save
*/

exports.save = function(req, res) {
  var purchase = new PurchaseCommittee(req.body);
  purchase.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/purchase_committee');
    }
    else
    {
      console.log(err); 
	    return res.render('purchaseCommittee/add',{
	        title: 'Purchase Committee',
	        purchase: purchase,
	        path: req.url,
	        errors: utils.errors(err.errors || err)
      });
    }
  });  
}
