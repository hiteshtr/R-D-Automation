var mongoose = require('mongoose')
var validate = require('../../lib/validate.js');
var Schema = mongoose.Schema
var crypto = require('crypto')
var  _ = require('underscore');

/**
 * User Schema
 */

var PclassSchema = new Schema({
	  project_class_code: { type: String, default:'',  validate:[validate.empty,'Project class code is required.'] },
	  project_class_name: { type: String , default: '',  validate:[validate.empty,'Project class name is required.'] }
  });

mongoose.model('Projectclass', PclassSchema)