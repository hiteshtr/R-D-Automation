/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');


/**
*Temporary Project Advance Form Schema
*/

var tempProAdvanceSchema = new Schema({
  form_filled_date: { type: Date, default: Date.now },
  expenditure_under_head: { type: String, default:'', validate:[validate.empty,'expenditure under head field must be filled'] },
  name_p_investigator: { type:String , default:'' , validate: [validate.alphaWithSpace,'Project Investigator name is required and must be alphabates.'] },
  pf_no: { type: String , default: '', validate:[validate.empty,'PF No. is required.'] },
  project_number: { type: String , default: '' , validate:[validate.empty,'Project No. is required.'] },
  amount_advance_required: { type: String, default:'' , validate: [validate.numeric,'Amount should be numeric.'] },
  purpose: { type: String , default: ''},
  advance_sanctioned: { type: String , default: '' , validate: [validate.alphaWithSpace,'Permanent Employee name required and must be alphabates.'] },
  pfno_advance_holder: { type: String , default: '' , validate:[validate.empty, 'PF number of advance holder is required.'] },
  bank_ac_no: { type: String , default: '' , validate: [validate.numeric,'Bank account number should be numeric.'] } 
});

/**
*Temporary Project Advance Form Model
*/

mongoose.model('TemporaryProjectAdvance', tempProAdvanceSchema);





