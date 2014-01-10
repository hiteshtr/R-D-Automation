/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * statement of Account Schema
 */

var StatementSchema = new Schema({
  advance_holder_name: { type: String, default:'', validate: [validate.alphaWithSpace,'Advance holder name is required and must be alphabates.'] },
  designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
  pf_no: { type: String, default:'', validate:[validate.empty,'PF No. is required.'] },
  type_of_advance: { type: String, default:'', validate:[validate.empty,'Type of advance is required.'] },
  advance_ref_no: { type: String, default:'', validate:[validate.empty,'Advance reference no. is required.'] },
  date: { type: Date, default:'' },
  cheque_no: { type: String, default:'', validate:[validate.empty,'Cheque No. is required.'] },
  amount: { type: String, default:'', validate:[validate.numeric,'Amount is required.'] },
  excess_amount: { type: String, default:'' },
  details: [{
  	date: { type: String, default: '', validate:[validate.empty,'Date is required.'] },
    receipt_no: { type: String, default: '', validate:[validate.empty,'Receipt no. is required.'] },
    name: { type: String, default: '', validate: [validate.alphaWithSpace,'Name is required and must be alphabates.'] },
    particulars: { type: String, default: '', validate:[validate.empty,'Particulars are required.'] },
    amount: { type: Number, default: '', validate:[validate.empty,'Amount is required.']},
    stock_register: { type: String, default: '', validate:[validate.empty,'Stock register is required.'] },
    page: { type: String, default: '', validate:[validate.empty,'Page is required.'] }
  }],
  total_amount: { type: Number, default:'', required:true }
});

/**
 * statement of Account Model
 */

mongoose.model('StatementOfAccount', StatementSchema);
