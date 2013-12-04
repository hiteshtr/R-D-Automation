/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var utils = require('../../lib/utils');
var _ = require('underscore');
var AdhocAppointment = mongoose.model('AdhocAppointment');

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

var adhocmodel= new AdhocAppointment(req.body);
    
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


