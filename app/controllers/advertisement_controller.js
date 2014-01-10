/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Designation = mongoose.model('Designation') 
 ,  ApprovalAdvertisement = mongoose.model('ApprovalAdvertisement');

/**
* Approval for advertisement Form
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) { 
    if(err)  
      {
        console.log(err);
      }  
    else
      { 
      	res.render('advertisementApproval/add',{ 
            title: 'Approval for Advertisement',
            designations: designations,
            advertisement: new ApprovalAdvertisement({}),
            path: req.url
        });
      }
  });
}

/**
* Approval for advertisement Form data save
*/

exports.save = function(req, res) {
  var advertisement= new ApprovalAdvertisement(req.body);
  advertisement.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/approval_for_advertisement');
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
    	    return res.render('advertisementApproval/add',{
    	        title: 'Approval for Advertisement',
              designations: designations,
    	        advertisement: advertisement,
    	        path: req.url,
    	        errors: utils.errors(err.errors || err)
          });
        }
      });
    }
  });  
}
