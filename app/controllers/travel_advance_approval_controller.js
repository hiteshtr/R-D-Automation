/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  TravelAdvanceApproval= mongoose.model('TravelAdvanceApproval');

/**
*Journey cum Travel Advance Approval Form 
*/

exports.trvlAdvncAppForm = function (req, res) {
res.render('travel_advance_approval/travel_advance_approval',{ 
	title: 'Journey cum Travel Advance Approval Form',
    travelAdvanceApproval : new TravelAdvanceApproval({})
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
		  res.render('travel_advance_approval/travel_advance_approval',{
		  	  title:'Journey cum Travel Advance Approval Form',
		  	  errors: utils.errors(err.errors || err),
		  	  travelAdvanceApproval:travelAdvanceApproval
		  });
		  console.log(err);  	
	 }
	  
  });

}