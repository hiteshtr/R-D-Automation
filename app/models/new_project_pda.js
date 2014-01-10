/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * New Project / PDA registration Schema
 */

var PDASchema = new Schema({
 // department_name: { type: String, default:'', validate:[validate.empty,'Department name is required.'] }
});

/**
 * New Project / PDA registration Model
 */

mongoose.model('NewProject', PDASchema);
