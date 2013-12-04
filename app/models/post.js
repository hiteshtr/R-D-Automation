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

var PostSchema = new Schema({
    post_name: { type: String, default:'', required:'Post name is required.'},
    post_qualification: { type:String, default:'', required:'Post qualification is required.'},
    post_type: { type:String },
    post_desig: { type:String }
});


/*Post Model */

mongoose.model('Post', PostSchema);