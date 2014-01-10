/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Engaging short-term Consultants Schema
 */

var ConsultantySchema = new Schema({
	form_filled_date: { type: Date, default: Date.now },
	name_pi:{ type: String, default: '', validate:[validate.alphaWithSpace ,'Name of PI is required and must be alphabates.'] },
	pf_no:{ type: String, default: '', validate:[validate.empty,'PF number is required.'] },
	project_no:{ type: String, default: '', validate:[validate.empty,'Project number is required.'] },
	project_head:{ type: String, default: '' },
	project_work:{ type: String, default: '', validate:[validate.empty,'Area of project work is required.']  },
	part_time_consultant:{ type: String, default: '', validate:[validate.alphaWithSpace ,'Short term consultant name is required and must be alphabates.'] },
	designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
	organisational_details: { type: String, default: '' },
	noc:{ type: String, default: '' },
	consultancy_charge:{ type: String, default: '', validate:[validate.empty,'Consultancy charges / remuneration payable to field must be filled.'] },
	bank_account_no:{ type: String, default: '', validate:[validate.numeric,'Bank account no. must be numeric.']},
	bank_name:{ type: String, default: '', validate:[validate.empty,'Bank name is required.'] },
	pan_service_tax:{ type: String, default: '', validate:[validate.empty,'PAN no./ service tax no. is required.']},
	from:{ type: Date, default:'' },
	to:{ type: Date, default:'' },
	amount:{ type: String, default: '' , validate:[validate.numericOrBlank,'Amount must be numeric.']}
});

/**
 *  Engaging short-term Consultants Model
 */

mongoose.model('ShortTermConsultant', ConsultantySchema);
