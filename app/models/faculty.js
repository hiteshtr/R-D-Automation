var mongoose = require('mongoose')
var validate = require('mongoose-validate');

var Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore');

/**
 * User Schema
 */

var FacultySchema = new Schema({
  faculty_name: { type: String, default:'', required:true },
  faculty_dept_id: { type:String, default:'' },
  faculty_desig_id: { type:String, default:''},
  faculty_email: { type:String, default:'', required:true, validate:[validate.email] },
  faculty_password: { type:String, default:'', required:true }
    
  });

mongoose.model('Faculty', FacultySchema);
