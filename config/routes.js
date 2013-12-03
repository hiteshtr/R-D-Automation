/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var main = require('../app/controllers/main_controller');
var user = require('../app/controllers/user_controller');
var auth = require('./middlewares/authorization');
var Projectclass=require('../app/controllers/prasad/projectclass_controller.js');

/**
 * Route middlewares
 */

//var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport, io) {

  // main route
  app.get('/', auth.requiresLogin, main.home);

  //User Routes
  app.get('/login', user.login);
  app.get('/logout', user.logout);
  //app.post('/users', user.create);
  app.post('/user/sessions', passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Invalid username or password.' }), user.sessions);
  app.get('/notification', user.createNotif);

  //Project Class Routes
  app.get('/Projectclass',Projectclass.index);
  app.post('/Projectclass',Projectclass.store);
  app.get('/Projectclass/list',Projectclass.show);
  app.del('/Projectclass/:id',Projectclass.destroy);
  app.get('/Projectclass/:id/edit',Projectclass.edit);
  app.put('/Projectclass/:id',Projectclass.update);

 //Department Routes
  var department=require('../app/controllers/prasad/department_controller.js');
  app.get('/department',department.index);
  app.post('/department',department.store);
  app.get('/department/list',department.show);
  app.del('/department/:id',department.destroy);
  app.get('/department/:id/edit',department.edit);
  app.put('/department/:id',department.update);

 //Post Routes
  var posts=require('../app/controllers/prasad/posts_controller.js');
  app.get('/posts',posts.index);
  app.post('/posts',posts.store);
  app.get('/posts/list',posts.show);
  app.del('/posts/:id',posts.destroy);
  app.get('/posts/:id/edit',posts.edit);
  app.put('/posts/:id',posts.update);

 // Faculty Routes
  var faculty=require('../app/controllers/prasad/faculty_controller.js');
  app.get('/faculty',faculty.index);
  app.post('/faculty',faculty.store);
  app.get('/faculty/list',faculty.show);
  app.del('/faculty/:id',faculty.destroy);
  app.get('/faculty/:id/edit',faculty.edit);
  app.put('/faculty/:id',faculty.update);

 //Project Route
  var project=require('../app/controllers/prasad/project_controller.js');
  app.get('/project',project.index);
  app.post('/project',project.store);
  app.get('/project/list', project.show);
  app.get('/project/:id/info',project.info);
}