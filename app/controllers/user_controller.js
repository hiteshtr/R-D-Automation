var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../../lib/utils');

/**
 * Login user
 */

var login = function (req, res) {
  User.findOneAndUpdate({_id: req.session.passport.user}, { $currentDate: { last_login: true }});
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}

exports.login = function (req, res) {
	res.render('users/login',{ title: 'Please login'});
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
}

/*
Notifications
*/

exports.createNotif = function (req, res) {
  User.findOneAndUpdate({username: "shwetaarora"}, { $push: { notification: { sender_id: "1", activity_type: "approval", object_type: "adhoc", object_url: "adhoc", time_sent: Date.now, is_unread: true}}}, function (err, data){
    if (err) { return utils.errors(err); };
    res.redirect('/');
  });
}

exports.checkNotif = function (data, socket) {
  User
    .find({ _id: data.message })
    .where('notification.is_unread').equals(true)
    .sort('-time_sent')
    .select('notification.activity_type notification.object_url -_id')
    .exec(function (err, result) {
      if(err) return utils.errors(err);
      else if (result != '') {
        socket.emit('fetch notifications',  { message: result });
      };
    });
}
/**
 * Session
 */

exports.sessions = login;