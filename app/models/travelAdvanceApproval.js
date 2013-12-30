/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore')
 ,  validate = require('../../lib/validate.js');

/**
*Journey cum Travel Advance Approval Form Schema
*/

var travelAdvanceSchema = new Schema({
  project_no : {type: String , default: '' , required: 'Project Number is required.'},
  name_of_traveller : {type: String , default: '' , validate:[validate.alphaWithSpace,'Traveller name is required and should be only alphabates.']},
  designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
  pf_no : {type: String , default:'', required: 'PF Number is required.'},
  journey_date : {type: Date , default: ''},
  returning_date : {type: Date , default: ''},
  travel_destination : {type: String , default: ''},
  purpose_of_journey : {type: String , default: ''},
  mode_of_travel : {type: String , default: ''},
  approxiamte_fair : {type: String , default: '',validate: [validate.numericOrBlank,'Fair should br numeric.']},
  advance_required : {type: String , default: '' , validate: [validate.numeric,'Advance amount should be numeric.']},
  bank_account_no : {type: String , default:'' , validate: [validate.numeric,'Bank account number should be numeric.']},
  previous_advance_pending : {type:String , default:''},
  arrangement_classes: {type: String , default:''},
});

/**
*Journey cum Travel Advance Approval Form Model
*/
mongoose.model('TravelAdvanceApproval', travelAdvanceSchema);






