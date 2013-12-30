/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Student employment in Projects Schema
 */

var StudentSchema = new Schema({
  pi_name: { type: String, default:'', validate:[validate.alphaWithSpace,'Name of PI is required and must be alphabates.'] },
  project_no: { type:String, default:'', validate:[validate.empty,'Project No. is required.'] },
  student_name: { type:String, default:'', validate:[validate.alphaWithSpace,'Name of student is required and must be alphabetes.'] },
  roll_no: { type : String, default: '', validate:[validate.empty,'Roll No. is required.'] },
  course_units: { type : String, default: '', validate:[validate.numericOrBlank,'Course units must be numeric.'] },
  thesis_units: { type : String, default: '', validate:[validate.numericOrBlank,'thesis units must be numeric.'] },
  programme: { type: String, default:'', validate:[validate.empty,'Programme is required.'] },
  emp_dept_id:  { type: Schema.ObjectId, ref: 'Department', required:'Department name is required.'},
  cpi: { type : Number, default: '', min:7, validate:[validate.empty,'CPI is required.'] },
  bankacno: { type : String, default: '', validate:[validate.numericOrBlank,'Bank Account No must be numeric.'] },
  bank_name: { type: String, default:'' },
  employment_type: { type: String, default:'', validate:[validate.empty,'Employment type is required.'] },
  hours_per_week: { type : String, default: '', validate:[validate.numericOrBlank,'Hours must be numeric.'] },
  per_hour_rs: { type : String, default: '', validate:[validate.numericOrBlank,'Rupees must be numeric.'] },
  consolidated_salary: { type : String, default: '', validate:[validate.numericOrBlank,'Salary must be numeric.'] },
  start_date: { type:Date, default:'' },
  end_date: { type:Date, default:'' },
  duration:  { type: Number, default:'', required:true }
});

/**
 * Student employment in Projects Model
 */

mongoose.model('StudentEmployment', StudentSchema);
