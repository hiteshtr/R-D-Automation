var express = require('express');
var http = require('http');
var fs = require('fs');
var passport = require('passport');
var exec = require('child_process').exec;
var util = require('util');
var Files = {};

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
// Connect to mongodb
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(config.db, options);
};
connect();

//Mongodb connection error handler
mongoose.connection.on('error', function (err) {
	console.log(err);
});

//Reconnect to mongodb when closed
mongoose.connection.on('disconnected', function () {
	connect();
});

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

    //File Upload Socket
    socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
      var Name = data['Name'];
      Files[Name] = {  //Create a new Entry in The Files Variable
         FileSize : data['Size'],
         Data   : "",
         Downloaded : 0
      }
      var Place = 0;
      try{
         var Stat = fs.statSync(__dirname + '/public/files/' +  Name);
         if(Stat.isFile())
         {
            Files[Name]['Downloaded'] = Stat.size;
            Place = Stat.size / 524288;
         }
      }
      catch(er){} //It's a New File
      fs.open(__dirname + "/public/files/" + Name, "a", 0755, function(err, fd){
         if(err)
         {
            console.log(err);
         }
         else
         {
            Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
            socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
         }
      });
	});

	socket.on('Upload', function (data){
	  var Name = data['Name'];
	  Files[Name]['Downloaded'] += data['Data'].length;
	  Files[Name]['Data'] += data['Data'];
	  if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
	  {
	     fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
	        //Get Thumbnail Here
	        var inp = fs.createReadStream("Temp/" + Name);
			var out = fs.createWriteStream("Video/" + Name);
			util.pump(inp, out, function(){
			   fs.unlink("Temp/" + Name, function () { //This Deletes The Temporary File
			      //Moving File Completed
			      socket.emit('Done');
			   });
			});
	     });
	  }
	  else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
	     fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
	        Files[Name]['Data'] = ""; //Reset The Buffer
	        var Place = Files[Name]['Downloaded'] / 524288;
	        var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
	        socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
	     });
	  }
	  else
	  {
	     var Place = Files[Name]['Downloaded'] / 524288;
	     var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
	     socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
	  }
	});

});

//Bootstrap routes
require('./config/routes')(app, passport, io);

// expose app
exports = module.exports = app