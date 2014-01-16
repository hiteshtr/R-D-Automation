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
    designation_name: { type: String, default:'', validate:[validate.empty,'Designation name is required.']},
    min_qualification: { type:String, default:'', validate:[validate.empty,'Minimum qualification is required.']},
    min_experience: {
    	year: { type: Number, default: '', required:true },
        month: { type: Number, default: '', required:true }
    },
    designation_type: { type:String , default:'', validate:[validate.empty,'Designation type is required.']},
    staff_type: { type:String, default:'',validate:[validate.empty,'Designation staff type is required.'] }
});


/*Post Model */

mongoose.model('Designation', DesignationSchema);