/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  Designation = mongoose.model('Designation')
 ,  TravelAdvanceApproval= mongoose.model('TravelAdvanceApproval');

/**
*Journey cum Travel Advance Approval Form 
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) {
	res.render('travelAdvanceApproval/add',{ 
		title: 'Journey cum Travel Advance Approval Form',
	    travelAdvanceApproval : new TravelAdvanceApproval({}),
	    designations: designations,
	    path:req.url
	});
  });
}


/**
*Journey cum Travel Advance Approval Form data save
*/

exports.save = function (req, res) {

  var travelAdvanceApproval = new TravelAdvanceApproval(req.body);

  travelAdvanceApproval.save(function (err,info) {
	if (!err) 
	{    req.flash('success', 'Form has been submitted successfully..');
	   	 res.redirect('/travel_advance_approval');
	}  
	else
	{
      Designation.find (function (err1,designations) {
		return res.render('travelAdvanceApproval/add',{
		  	  title:'Journey cum Travel Advance Approval Form',
		  	   travelAdvanceApproval:travelAdvanceApproval,
		  	   designations: designations,
		  	  path:req.url,
		  	  errors: utils.errors(err.errors || err)		  	 
		  });
	 });
		  console.log(err);  	
	 }
	  
  });

}