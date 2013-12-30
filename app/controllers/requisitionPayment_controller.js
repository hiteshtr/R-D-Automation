/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  RequisitionForPayment = mongoose.model('RequisitionForPayment')  

/**
* Requisition_for_payment Form
*/

exports.add = function (req, res) {
	res.render('requisitionPayment/add',{ 
      title: 'Requisition for Payment or Reimbursement ',
      requisitionPayment: new RequisitionForPayment({}),
      path: req.url
  });
}

/**
* Requisition_for_payment Form data save
*/

exports.save = function(req, res) {
  var requisitionPayment= new RequisitionForPayment(req.body);
  requisitionPayment.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/requisition_for_payment');
    }
    else
    {    
      return res.render('requisitionPayment/add',{
       title: 'Requisition for Payment Reimbursement  ',
       requisitionPayment: requisitionPayment,
       path: req.url,
       errors: utils.errors(err.errors || err)
     });
    }
  });  
}
