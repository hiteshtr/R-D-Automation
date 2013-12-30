var mongoose = require('mongoose')
var validate = require('../../lib/validate.js');

var Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore');

/**
 * User Schema
 */

var ProjectSchema = new Schema({
    project_title:  { type: String, default:'', required:true },
    project_no: { type: String, default: '', required: true },
    sponsoring_agency:  { type: String, default:'', required:true },
    type_of_agency:  { type: String, default:''},
    country:  { type: String, default:'', required:true },
    collaborating_agency:  { type: String, default:'', required:true },
    research_area:  { type: String, default:'', required:true },
    sanction_number:  { type: Number, default:'', required:true, validate:[validate.numeric] },
    sanction_date:  { type: Date, default:'', required:true },
    duration:  { type: Number, default:'', required:true, validate:[validate.numeric] },
    start_date:  { type: Date, default:'', required:true },
    end_date:  { type: Date, default:'', required:true },
    sanctioned_amount:  { type: Number, default:'', required:true, validate:[validate.numeric] },
    project_class_id:  { type: Schema.ObjectId, ref: 'Projectclass', required: true },
    department_id:  { type: Schema.ObjectId, ref: 'Department', required:true },
    attachments:[
        {
            name: { type: String, default: '' },
            type: { type: String, default: '' },
            url: { type: String, default: '' }
        }
    ],
    investigator: [
        {
            faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty'},
            role: { type: String, default: '' }
        }
    ],
    project_post: [
        {
            designation_id: { type: Schema.Types.ObjectId, ref: 'Designation'},
            salary: { type: Number, default: '' }
        }
    ],
    funds:[
        {
            fund_type: { type: String, default: '' },
            fund_amount: { type: Number, default: '' },
            fund_category: { type: String, default: '' }
        }
    ]   
});

mongoose.model('Project', ProjectSchema);
