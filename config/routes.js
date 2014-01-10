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
  app.put('/projectclass/:id',projectclass.update);

 //Department Routes
  var department=require('../app/controllers/department_controller.js');
  app.get('/department',department.add_department);
  app.post('/department',department.save);
  app.get('/department/list',department.show);
  app.del('/department/:id',department.destroy);
  app.put('/department/:id',department.update);

 //Post Routes
  var designation=require('../app/controllers/designation_controller.js');
  app.get('/designation',designation.add);
  app.post('/designation',designation.save);
  app.get('/designation/list',designation.show);
  app.del('/designation/:id',designation.destroy);
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
  app.get('/adhoc',adhoc.add);
  app.post('/adhoc',adhoc.save);

 //Temp_Project_Advance_Routes
  var tmpProAdvnc = require('../app/controllers/tempProjectAdvance_controller');
  app.get('/temp_project_advance',tmpProAdvnc.add);
  app.post('/temp_project_advance',tmpProAdvnc.save);

 //Travel_Advance_Approval Routes
  var trvlAdvncApp = require('../app/controllers/travelAdvanceApproval_controller');
  app.get('/travel_advance_approval',trvlAdvncApp.add);
  app.post('/travel_advance_approval',trvlAdvncApp.save);

 //No Dues Routes
  var noDues = require('../app/controllers/no_dues_controller');
  app.get('/no_dues',noDues.add);
  app.post('/no_dues',noDues.save);


  //purchase committee Route
  var purchaseCommittee = require('../app/controllers/purchaseCommittee_controller');
  app.get('/purchase_committee',purchaseCommittee.add);
  app.post('/purchase_committee',purchaseCommittee.save);

  
  //extension of duration Route
  var extensionOfDuration = require('../app/controllers/extensionOfDuration_controller');
  app.get('/extension_of_duration_of_project_employee',extensionOfDuration.add);
  app.post('/extension_of_duration_of_project_employee',extensionOfDuration.save);

  //release of payment Route
  var releaseOfPayment = require('../app/controllers/releaseOfPayment_controller');
  app.get('/release_of_payment_for_students',releaseOfPayment.add);
  app.post('/release_of_payment_for_students',releaseOfPayment.save);

  //advertisement approval Route
  var advertisement = require('../app/controllers/advertisement_controller');
  app.get('/approval_for_advertisement',advertisement.add);
  app.post('/approval_for_advertisement',advertisement.save);

  //disbursement honorarium Route
  var disbursementHonorarium = require('../app/controllers/disbursementHonorarium_controller');
  app.get('/disbursement_honorarium',disbursementHonorarium.add);
  app.post('/disbursement_honorarium',disbursementHonorarium.save);

  //joining report Route
  var joiningReport = require('../app/controllers/joiningReport_controller');
  app.get('/joining_report',joiningReport.add);
  app.post('/joining_report',joiningReport.save);

  //remuneration or consultancy fees Route
  var remunerationConsultancy = require('../app/controllers/remunerationConsultancy_controller');
  app.get('/remuneration_or_consultancy_fees',remunerationConsultancy.add);
  app.post('/remuneration_or_consultancy_fees',remunerationConsultancy.save);

  //requisition for payment Route
  var requisitionPayment = require('../app/controllers/requisitionPayment_controller');
  app.get('/requisition_for_payment',requisitionPayment.add);
  app.post('/requisition_for_payment',requisitionPayment.save);

  //selection committee Route
  var selectionCommittee = require('../app/controllers/selectionCommittee_controller');
  app.get('/selection_committee',selectionCommittee.add);
  app.post('/selection_committee',selectionCommittee.save);

  //short term consultant Route
  var shortTermConsultant = require('../app/controllers/shortTermConsultant_controller');
  app.get('/short_term_consultant',shortTermConsultant.add);
  app.post('/short_term_consultant',shortTermConsultant.save);

  //student employment Route
  var studentEmployment = require('../app/controllers/studentEmployment_controller');
  app.get('/student_employment',studentEmployment.add);
  app.post('/student_employment',studentEmployment.save);

 //statement of account Route
 var statementOfAccount = require('../app/controllers/statementOfAccount_controller');
 app.get('/statement_of_account',statementOfAccount.add);
 app.post('/statement_of_account',statementOfAccount.save);

// New Project/PDA Registration Route
var newProjectPda = require('../app/controllers/newProjectPda_controller');
app.get('/newProject_or_pda_registration',newProjectPda.add);
app.post('/newProject_or_pda_registration',newProjectPda.save);
}