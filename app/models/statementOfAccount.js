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
  advance_holder_name: { type: String, default:'' },
  designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
  pf_no: { type: String, default:'' },
  type_of_advance: { type: String, default:'' },
  advance_ref_no: { type: String, default:'' },
  date: { type: Date, default:'' },
  cheque_no: { type: String, default:'' },
  amount: { type: String, default:'' },
  excess_amount: { type: String, default:'' },
  details: [{
  	date1: { type: String, default: '' },
    receipt_no: { type: String, default: '' },
    name: { type: String, default: '' },
    particulars: { type: String, default: '' },
    amount1: { type: Number, default: '' },
    stock_register: { type: String, default: '' },
    page: { type: String, default: '' }
  }],
  total_amount: { type: Number, default:'' }
});

/**
 * statement of Account Model
 */

mongoose.model('StatementOfAccount', StatementSchema);
