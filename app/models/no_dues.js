/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');



/**
*No Dues Form Schema
*/

var NoDuesSchema = new Schema({
  employee_name: { type : String, default:'', validate:[validate.alphaWithSpace,'Employee name is required and must be alphabates.'] },
  Pf_no: {type : String, default: '', validate:[validate.empty,'PF number is required.'] },
  designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
  project_no: { type: String, default: '', validate:[validate.empty,'Project number is required.'] },
  from: { type: Date, default:'' },
  to: { type: Date, default:'' },
  resignation_date: { type: Date, default:'' },
  re_emp_project_no: { type: String, default: '' },
  bank_account_no: { type: Number, default:'', validate:[validate.isInt,'Account no should be integer']}
});

/*No Dues Form Model */

mongoose.model('NoDues', NoDuesSchema);