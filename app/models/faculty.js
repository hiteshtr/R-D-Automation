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
    faculty_name: { type: String, default:'', required:'Faculty name is required.' },
    faculty_dept_id:  { type: Schema.ObjectId, ref: 'Department' },
    faculty_desig_id:  { type: Schema.ObjectId, ref: 'Post' },
    //faculty_dept_id: { type:String, default:'' ,required:'Department name is required.'},
    //faculty_desig_id: { type:String, default:'',required:'Designation is required.'},
    faculty_email: { type:String, default:'', required:'Email ID is required.'},
    faculty_password: { type:String, default:'', required:'Password is required.' }

});


/**
 * Faculty Resignation Model
 */

mongoose.model('Faculty', FacultySchema);

