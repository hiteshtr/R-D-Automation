var mongoose = require('mongoose')
var validate = require('../../lib/validate.js');
var Schema = mongoose.Schema
var crypto = require('crypto')
var  _ = require('underscore');

/**
 * User Schema
 */

var DepartmentSchema = new Schema({
  department_name: { type: String, default:'',required:'Department name is required.' }
  });

mongoose.model('Department', DepartmentSchema);
