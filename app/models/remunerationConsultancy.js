/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Remuneration_or_consultancy_fees Schema
 */

var RemunerationSchema = new Schema({
  pi_name: { type: String, default: '' , validate:[validate.alphaWithSpace,'Name of PI is required and must be alphabates.']},
  pf_no: { type: String, default: '' , validate:[validate.empty,'PF No is required.']},
  project_no: { type: String, default: '' , validate:[validate.empty,'Project No is required.']},
  sanction_no: { type: String, default: '' },
  sanction_date: { type: Date, default: '' },
  project_head: { type: String, default: '' },
  appointment_outcome: { type: String, default: '' },
  charges_payable: { type: String, default: '', validate:[validate.numeric,'Remuneration/consultancy charges is required and must be numeric.'] },
  from: { type: Date, default: '' },
  to: { type: Date, default: '' },
  name_institute: { type: String, default: '', validate:[validate.empty,'Name of Institute is required.'] },
  service_tax_no: { type: String, default: '', validate:[validate.empty,'Service tax no. is required.'] },
  pan_tan_no: { type: String, default: '',validate:[validate.empty,'PAN/TAN no. is required.'] },
  tin_no: { type: String, default: '', validate:[validate.empty,'Name of the Institute is required.'] },
  mode_payment: { type: String, default: '', validate:[validate.empty,'TIN no. is required.'] },
  bank_account_no: { type: String, default: '', validate:[validate.numeric,'Bank Account No is required and must be numeric.'] },
  bank_name: { type: String, default: '', validate:[validate.alphaWithSpace,'Bank Name is required and must be alphabates.'] },
});

/**
 * Remuneration_or_consultancy_fees Model
 */

mongoose.model('Remuneration', RemunerationSchema);
