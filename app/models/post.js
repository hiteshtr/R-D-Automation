var mongoose = require('mongoose')
var validate = require('mongoose-validate');

 var Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore');

/**
 * User Schema
 */

var PostSchema = new Schema({
  post_name: { type: String, default:'', required:true },
  post_qualification: { type:String, default:'', required:true },
  post_type: { type:String, default:'' },
  post_desig: { type:String, default:'' }
});

mongoose.model('Post', PostSchema);