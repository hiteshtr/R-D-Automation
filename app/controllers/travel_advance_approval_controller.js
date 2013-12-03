/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var utils = require('../../lib/utils');
var _ = require('underscore');
var TravelAdvanceApproval=require('../models/travel_advance_approval_model.js');

/**
*Journey cum Travel Advance Approval Form 
*/

exports.trvlAdvncAppForm = function (req, res) {
res.render('travel_advance_approval/travel_advance_approval',{ title: 'Journey cum Travel Advance Approval Form'});
}


/**
*Journey cum Travel Advance Approval Form data save
*/

exports.save = function (req, res) {

new TravelAdvanceApproval({

	project_No : req.body.pn,
	name_of_traveller : req.body.ntrav,
    Designation : req.body.desig,
    pf_no : req.body.pfn,
	journey_date : req.body.jdate,
    returning_date : req.body.rdate,
	travel_destination : req.body.tdest,
	purpose_of_journey : req.body.pj,
	mode_of_travel : req.body.mt,
	approxiamte_fair : req.body.af,
	advance_required : req.body.ar,
	bank_account_no : req.body.ban,
	previous_advance_pending : req.body.pap,
	arrangement_classes:req.body.acd
	
}).save(function (err) {
  if (!err) 
  {    req.flash('success', 'Form has been submitted successfully..');
   	   res.redirect('/travel_advance_approval');
       console.log('Form has been submitted successfully..');
  }  
  else
  {
	  	res.render('travel_advance_approval/travel_advance_approval',{title:'Journey cum Travel Advance Approval Form',errors: utils.errors(err.errors || err)});
	  	console.log('Form has not been submitted..');
	  	console.log(err);
	  	
  }
  // saved!
});

}