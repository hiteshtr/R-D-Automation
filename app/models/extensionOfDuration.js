/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * ExtensionOfDuration Schema
 */

var ExtensionSchema = new Schema({
  project_no:{ type: String, default: '', validate:[validate.empty,'Project No is required.'] },
  project_title:{ type: String, default: '', validate:[validate.empty,'Project title is required'] },
  employee_name:{ type: String, default: '', validate:[validate.alphaWithSpace,'Employee Name is required and must be alphabets.'] },
  pf_no:{ type: String, default: '', validate:[validate.empty,'PF No is required.'] },
  mode:{ type: String, default: '', validate:[validate.empty,'Mode is required.'] },
  designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
  salary: { type: Number, default:'', validate:[validate.empty,'Salary is required.']},
  type_salary:{ type: String, default: '', validate:[validate.empty,'Present salary type is required.'] },
  joining_date:{ type: Date, default: '', validate:[validate.empty,'Joining date is required.'] },
  expiry_date:{ type: Date, default: '', validate:[validate.empty,'Expiry date is required.'] },
  service_record:{ type: String, default: '', validate:[validate.empty,'Service record is required.'] },
  project_requirement:{ type: String, default: '' },
  comment:{ type: String, default: '' },
  from:{ type: Date, default: '', validate:[validate.empty,'Extension period is required.'] },
  to:{ type: Date, default: '', validate:[validate.empty,'Extension period is required.'] },
  salary_month: { type: Number, default:'', validate:[validate.empty,'Salary is required.']},
  salary_type:{ type: String, default: '', validate:[validate.empty,'Salary type is required.']}
});

/**
 * ExtensionOfDuration Model
 */

mongoose.model('ExtensionDuration', ExtensionSchema);
