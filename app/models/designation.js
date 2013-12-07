/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');



/**
 * Post Schema
 */

var DesignationSchema = new Schema({
    designation_name: { type: String, default:'', required:'Name of designation is required.'},
    min_qualification: { type:String, default:'', required:'Minimum qualification is required.'},
    min_experience: {
    	year: Number,
    	month: Number
    },
    designation_type: { type:String ,default:'',required:'Post type is required.'},
    staff_type: { type:String,default:'',required:'Designation staff type is required.' }
});


/*Post Model */

mongoose.model('Designation', DesignationSchema);