var mongoose = require('mongoose')
var validate = require('mongoose-validate');
var Schema = mongoose.Schema
var crypto = require('crypto')
var  _ = require('underscore');

/**
 * User Schema
 */

var PclassSchema = new Schema({
	  project_class_code: { type: String, default:'', required:true },
	  project_class: { type: String , default: '', required:true }
  });

mongoose.model('Projectclass', PclassSchema)