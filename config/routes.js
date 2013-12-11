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
  var projectclass=require('../app/controllers/projectclass_controller.js');
  app.get('/projectclass',projectclass.add_projectclass);
  app.post('/projectclass',projectclass.save);
  app.get('/projectclass/list',projectclass.show);
  app.del('/projectclass/:id',projectclass.destroy);
  app.get('/projectclass/:id/edit',projectclass.edit);
  app.put('/projectclass/:id',projectclass.update);

 //Department Routes
  var department=require('../app/controllers/department_controller.js');
  app.get('/department',department.add_department);
  app.post('/department',department.save);
  app.get('/department/list',department.show);
  app.del('/department/:id',department.destroy);
  app.get('/department/:id/edit',department.edit);
  app.put('/department/:id',department.update);

 //Post Routes
  var designation=require('../app/controllers/designation_controller.js');
  app.get('/designation',designation.add);
  app.post('/designation',designation.save);
  app.get('/designation/list',designation.show);
  app.del('/designation/:id',designation.destroy);
  app.get('/designation/:id/edit',designation.edit);
  app.put('/designation/:id', designation.update);

 // Faculty Routes
  var faculty=require('../app/controllers/faculty_controller.js');
  app.get('/faculty',faculty.add_faculty);
  app.post('/faculty',faculty.save);
  app.get('/faculty/list',faculty.show);
  app.del('/faculty/:id',faculty.destroy);
  app.put('/faculty/:id',faculty.update);

 //Project Routes
  var project=require('../app/controllers/project_controller.js');
  app.get('/project',project.new_project);
  app.post('/project',project.save);
  app.get('/project/list', project.show);
  app.get('/project/:id/info',project.info);

 //Adhoc Routes
  var adhoc = require('../app/controllers/adhocform_controller');
  app.get('/adhoc',adhoc.adhocform);
  app.post('/adhoc',adhoc.save);

 //Temp_Project_Advance_Routes
  var tmpProAdvnc=require('../app/controllers/temp_project_advance_controller');
  app.get('/temp_project_advance',tmpProAdvnc.tmpProAdvncForm);
  app.post('/temp_project_advance',tmpProAdvnc.save);

 //Travel_Advance_Approval Routes
  var trvlAdvncApp=require('../app/controllers/travel_advance_approval_controller');
  app.get('/travel_advance_approval',trvlAdvncApp.trvlAdvncAppForm);
  app.post('/travel_advance_approval',trvlAdvncApp.save);

 //No Dues Routes
  var noDues=require('../app/controllers/no_dues_controller');
  app.get('/no_dues',noDues.noDuesForm);
}