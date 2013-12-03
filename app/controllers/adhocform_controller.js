/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var utils = require('../../lib/utils');
var _ = require('underscore');
var AdhocAppointment = require("../models/adhocform_model.js");

/**
* Adhoc Form
*/

exports.adhocform = function (req, res) {
	res.render('adhoc/adhocform',{ title: 'Request for Ad-hoc Appointment'});
}


/**
* Adhoc Form data Save
*/

exports.save = function(req, res) {

var adhocmodel= new AdhocAppointment({
    project_no : req.body.projectno,
    project_title:req.body.prot,
    project_completion_date: req.body.pcd,
    candidate_name: req.body.cname,
    date_of_birth: req.body.dob,
    permanent_address:  req.body.padd,
    phone_no: req.body.phno,
    email_id: req.body.eid,
    post_suggested: req.body.post,
    monthly_consolidated_salary: req.body.salary,
    from : req.body.from,
    to : req.body.to,
    justification: req.body.justification,
    name_of_project_investigator: req.body.piname,
    pfno_of_project_investigator: req.body.pfno
    });

adhocmodel.save(function (err,info) {
    if (!err) //return handleError(err);
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/adhoc');
    console.log("Form has been submitted successfully");
    }
  else
    {//send error
       /*console.log(err);
       console.log(err.code);
       if(err.code==11000)
        {
         req.flash('errors','email id is already registered..!!');
         res.redirect('/adhoc');
         console.log("email id is already registered..!!");
         console.log("not saved");
        }

      else{  */
        console.log("not saved");
        console.log(err);
        res.render('adhoc/adhocform',{title: 'Request for Ad-hoc Appointment',errors: utils.errors(err.errors || err)});
        }
 });
  //save
};


