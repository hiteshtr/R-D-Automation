/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Department Schema
 */

var ConsultantySchema = new Schema({
 name_pi:{ type: String, default: '', validate:[validate.alphaWithSpace ,'Name of PI is required.'] },
 pf_no:{ type: String, default: '', validate:[validate.empty,'PF number is required.'] },
 project_no:{ type: String, default: '', validate:[validate.empty,'Project number is required.'] },
 project_head:{ type: String, default: '' },
 project_work:{ type: String, default: '' },
 part_time_consultant:{ type: String, default: '' },
 designation:{ type: String, default: '' },
 noc:{ type: String, default: '' },
 consultancy_charge:{ type: String, default: '' },
 bank_account_no:{ type: String, default: '' ,validate:[validate.numericOrBlank,'Bank account nomust be numeric.']},
 bank_name:{ type: String, default: '' },
 pan_service_tax:{ type: String, default: '' ,validate:[validate.numericOrBlank,'pan no/ service tax no must be numeric.']},
 from:{ type: Date, default:'' },
 to:{ type: Date, default:'' },
 amount:{ type: String, default: '' ,validate:[validate.numericOrBlank,'amount must be numeric.']}
  });

/**
 * Department Model
 */

mongoose.model('ShortTermConsultant', ConsultantySchema);
