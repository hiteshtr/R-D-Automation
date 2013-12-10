/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore');

/**
 * User Schema
 */

var UserSchema = new Schema({
  name: { type: String , default: ''},
  email: { type: String, unique: true, required: true },
  username: { type: String, default: '' },
  group: { type: String, default: '' },
  role: [],
  last_login: { type: Date, default: Date.now },
  notification: [
    {
      sender_id: {type: Schema.Types.ObjectId, ref: 'User'},
      activity_type: String,
      object_type: String,
      object_url: String,
      time_sent: { type:Date, default: Date.now },
      is_unread: Boolean
    }
  ]
});

mongoose.model('User', UserSchema)