/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');



/**
*Adhoc Form Schema
*/

var AdhocSchema = new Schema({
  project_no: { type: String, default: '', validate:[validate.empty,'Project number is required.'] },
  project_title: { type: String, default: '', validate:[validate.alphanumericWithSpace ,'Project title is required.'] },
  project_completion_date: { type: Date, default: ''},
  candidate_name: { type : String, default:'', validate:[validate.alphaWithSpace,'Candidate name is required and should be only alphabates.'] },
  date_of_birth: { type : Date, default:'' },
  permanent_address: { type : String, default:'' },
  phone_no: { type : String, default: ''},
  email_id: { type : String, default:'', required:'Email ID is required.', unique:true, validate: [validate.email,'Invalid Email ID.'] },
  post_suggested: { type : String, default:''},
  monthly_consolidated_salary: { type : String, default: '', validate:[validate.numericOrBlank,'Salary should be numeric.'] },
  from: { type: Date, default:'' },
  to: { type: Date, default:'' },
  justification: { type : String, default:'' },
  name_of_project_investigator: { type : String, default:'' },
  pfno_of_project_investigator: { type : String, default: '' },
  qualification_match: { type : String, default:'' },
  salary_proposed_is_as_per_structure: { type : String, default:'' },
  funds_status: { type: Number, default:'' }
});


/*Adhoc Form Model */

mongoose.model('AdhocAppointment', AdhocSchema);

