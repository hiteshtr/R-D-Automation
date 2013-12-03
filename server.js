var express = require('express');
var http = require('http');
var fs = require('fs');
var passport = require('passport');

/*
--Main application entry file
--Note:- order of loading is important
*/

//Load configurations
//if test env, load exapmle file
var env = process.env.NODE_ENV || 'development'
	, config = require('./config/config')[env]
	, mongoose = require('mongoose');

//Bootstrap db connection
mongoose.connect(config.db);

//Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
	if (~file.indexOf('.js')) require(models_path  + '/' + file);
});

// bootstrap passport config
require('./config/passport')(passport, config);

var app = express();

//express settings
require('./config/express')(app, config, passport);




// Start the app by listening on <port>
var port = process.env.PORT || 3000;

//socket.io
io = require('socket.io').listen(app.listen(port));
console.log('Express app started on port '+port);

io.sockets.on('connection', function (socket) {
    socket.on('notification', function (data) {
    	require('./app/controllers/user_controller').checkNotif(data, socket);
    });
});

//Bootstrap routes
require('./config/routes')(app, passport, io);

// expose app
exports = module.exports = app