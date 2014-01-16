/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Faculty Resignation Schema
 */

var FacultySchema = new Schema({
    faculty_name: { type: String, default:'', validate:[validate.empty,'Faculty name is required.'] },
    faculty_dept_id:  { type: Schema.ObjectId, ref: 'Department', validate:[validate.empty,'Department is required.']},
    faculty_desig_id:  { type: Schema.ObjectId, ref: 'Designation', validate:[validate.empty,'Designation is required.']},
    faculty_email: { type:String, default:'',validate:[validate.emailOrBlank,'Invalid Email ID.']},
});


/**
 * Faculty Resignation Model
 */

mongoose.model('Faculty', FacultySchema);

