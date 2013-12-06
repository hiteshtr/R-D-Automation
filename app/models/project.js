var mongoose = require('mongoose')
var validate = require('mongoose-validate');

var Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore');

/**
 * User Schema
 */

var ProjectSchema = new Schema({
            project_title:  { type: String, default:'', required:true },
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
            project_class_id:  { type: Schema.ObjectId, ref: 'Projectclass' },
            department_id:  { type: Schema.ObjectId, ref: 'Department' },
    
  });

mongoose.model('Project', ProjectSchema);