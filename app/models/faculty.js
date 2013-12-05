/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');


/**
 * Faculty Resignation Schema
 */

var FacultySchema = new Schema({
    faculty_name: { type: String, default:'', required:true },
    faculty_dept_id: { type:String, default:'' },
    faculty_desig_id: { type:String, default:''},
    faculty_email: { type:String, default:'', required:true},
    faculty_password: { type:String, default:'', required:true }
});


/**
 * Faculty Resignation Model
 */

mongoose.model('Faculty', FacultySchema);
