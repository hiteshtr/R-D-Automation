/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');


/**
*Joining Report Form Schema
*/

var JoiningSchema = new Schema({
  form_filled_date: { type: Date, default: Date.now },
  candidate_name: { type: String, default: '', validate:[validate.alphaWithSpace,'Candidate Name is required and must be alphabets.'] },
  contact_no: { type: String, default: '', validate:[validate.numeric,'Contact No is required and must be numeric.'] },
  designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
  project_no: { type: String, default: '', validate:[validate.empty,'Project No is required.'] },
  date_joining: { type: Date, default: '', validate:[validate.empty,'Date of Joining is required.'] },
  bank_name: { type: String, default: '' },
  bankacno: { type: String, default: '' },
  salary: { type: String, default: '', validate:[validate.numericOrBlank,'Salary must be numeric.'] },
  days: { type: String, default: '', validate:[validate.numeric,'Days must be numeric.'] },
  bond: { type: String, default: '', required:'Bond is required.' },
  declaration: { type: String, default: '', required:'Declaration is required.' }
});


/*Joining Report Form Model */

mongoose.model('JoiningReport', JoiningSchema);
