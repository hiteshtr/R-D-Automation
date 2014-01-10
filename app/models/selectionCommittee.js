/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');



/**
*Selection Committee Form Schema
*/

var SelectionSchema = new Schema({
  project_no: { type: String, default: '', validate:[validate.empty,'Project number is required.'] },
  project_title: { type: String, default: '', validate:[validate.empty ,'Project title is required.'] },
  project_completion_date: { type: Date, default:'' },
  writtenexam_date: { type: Date, default:'' },
  interview_date: { type: Date, default:'' },
  applied: { type:String, default:'', validate:[validate.numeric,'Applied candidate is required and must be numeric.']},
  called: { type:String, default:'', validate:[validate.numeric,'called candidate is required and must be numeric.']},
  appeared: { type:String, default:'', validate:[validate.numeric,'Appeared candidate is required and must be numeric.']},
  qualified: { type:String, default:'', validate:[validate.numeric,'Qualified candidate is required and must be numeric.']},
  interviewed: { type:String, default:'', validate:[validate.numeric,'Interviewed candidate is required and must be numeric.']},
  appoint: [{
    name: { type: String, default: '' },
    pfno: { type: String, default: '' },
    date_of_birth: { type: Date, default: '' },
    address: { type: String, default: '' },
    designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
    salary: { type: String, default: '' },
    appointment: 
      { 
        year: { type: Number, default: '' },
        month: { type: Number, default: '' }
      }
  }],
  waiting: [{
    name: { type: String, default: '' },
    pfno: { type: String, default: '' },
    date_of_birth: { type: Date, default: '' },
    address: { type: String, default: '' },
    designation_id: { type: Schema.ObjectId, ref: 'Designation' ,required:'Designation is required.'},
    salary: { type: String, default: '' },
    appointment: 
      { 
        year: { type: Number, default: '' },
        month: { type: Number, default: '' }
      }
  }]
});


/*Selection Committee Form Model */

mongoose.model('SelectionCommittee', SelectionSchema);
