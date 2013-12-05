var mongoose = require('mongoose')
var validate = require('mongoose-validate');
var Schema = mongoose.Schema
var crypto = require('crypto')
var  _ = require('underscore');

/**
 * User Schema
 */

var DeptSchema = new Schema({
  department: { type: String, default:'',required:'Department name is required.' }
  });

mongoose.model('Department', DeptSchema);
