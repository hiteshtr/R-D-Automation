/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Department Schema
 */

var DepartmentSchema = new Schema({
  department_name: { type: String, default:'', validate:[validate.empty,'Department name is required.'] }
});

/**
 * Department Model
 */

mongoose.model('Department', DepartmentSchema);
