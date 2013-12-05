/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');
var validate = require('../../lib/validate.js');

/**
*Journey cum Travel Advance Approval Form Schema
*/

var travelAdvanceSchema = new Schema({
  project_No : {type:String,default:'', validate:[function(v){return v.length > 0;},'Project Number is required..']},
  name_of_traveller : {type:String,default:'', validate:[validate.alphaWithSpace,'Traveller name is required and should be only alphabates..']},
  Designation : {type:String,default:'',validate:[validate.alphaWithSpace,'Designation is required and should be only alphabates..']},
  pf_no : {type:String,default:'', validate:[function(v){return v.length > 0;},'PF Number is required..']},
  journey_date : {type:Date,default:'',},
  returning_date : {type:Date,default:'',},
  travel_destination : {type:String,default:''},
  purpose_of_journey : {type:String,default:''},
  mode_of_travel : {type:String,default:''},
  approxiamte_fair : {type:String,default:'',},
  advance_required : {type:String,default:'', validate:[validate.numeric,'Advance amount should be numeric..']},
  bank_account_no : {type:String,default:'',validate:[validate.numeric,'Bank account number should be numeric..']},
  previous_advance_pending : {type:String,default:''},
  arrangement_classes:{type:String,default:''},
});

/**
*Journey cum Travel Advance Approval Form Model
*/
module.exports = mongoose.model('TravelAdvanceApproval', travelAdvanceSchema);






