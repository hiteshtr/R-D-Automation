/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var utils = require('../../lib/utils');
var _ = require('underscore');
var TemporaryProjectAdvance=require('../models/temp_project_advance.js');

/**
* Temporary Project Advance Form
*/

exports.tmpProAdvncForm = function (req, res) {
res.render('temp_project_advance/temp_project_advance',{ title: 'Temporary Project Advance Form'});
}


/**
*Temporary Project Advance Form data Save
*/
exports.save = function (req, res) {

new TemporaryProjectAdvance({

	expenditure_under_head : req.body.euh,
	name_p_investigator : req.body.npi,
  pf_no : req.body.pf,
  project_number : req.body.prn,
	amount_advance_required : req.body.aar,
  purpose : req.body.purpo,
	advance_sanctioned : req.body.sanc,
	pfno_advance_holder : req.body.advhol,
	bank_ac_no : req.body.bac
}).save(function (err) {
  if (!err) 
  {    req.flash('success','Form has been submitted successfully');
   	   res.redirect('/temp_project_advance');
       console.log('Form has been submitted successfully');
  }  
  else
  {
  	
    res.render('temp_project_advance/temp_project_advance',{title:'Temporary Project Advance Form',errors: utils.errors(err.errors || err)});
  	console.log(err);
  	console.log('not saved');
  }
  // saved!
});

}