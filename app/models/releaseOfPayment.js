/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Release Of Payment Schema
 */

var ReleaseSchema = new Schema({
  project_no: { type: String, default: '', validate:[validate.empty,'Project No. is required.'] },
  pi_name: { type: String, default: '', validate:[validate.alphaWithSpace,'PI Name is required and must be alphabates.'] },
  pf_no: { type: String, default: '', validate:[validate.empty,'PF No. is required.'] },
  student_name: { type: String, default: '', validate:[validate.alphaWithSpace,'Student Name is required and must be alphabates.'] },
  bank_account_no: { type: String, default: '',  validate:[validate.empty,'Bank Account No is required.'] },
  from: { type: Date, default: '' },
  to: { type: Date, default: '' },
  outcome: { type: String, default: '' },
  mode_of_payment: { type: String, default: '',validate:[validate.empty,'Mode of Payment is required.'] },
  payable: { type: Number, default: '', validate:[validate.empty,'payable rupees is required.'] }
});

/**
 * Release Of Payment Model
 */

mongoose.model('ReleaseOfPayment', ReleaseSchema);
