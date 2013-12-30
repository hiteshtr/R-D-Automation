/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Designation = mongoose.model('Designation') 
 ,  StatementOfAccount = mongoose.model('StatementOfAccount')  

/**
* statement of account Form
*/

exports.add = function (req, res) {
  Designation.find (function (err1,designations) {  
  	res.render('statementOfAccount/add',{ 
        title: 'Statement of Accounts for Settlement of Temporary Advance ',
        statementAccount: new StatementOfAccount({}),
        designations: designations,
        path: req.url
    });
  });
}

/**
* statement of account Form data save
*/

exports.save = function(req, res) {
  var statementAccount= new StatementOfAccount(req.body);
  statementAccount.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/statement_of_account');
    }
    else
    { Designation.find (function (err1,designations) {   
        return res.render('statementOfAccount/add',{
         title: 'Statement of Accounts for Settlement of Temporary Advance',
         statementAccount: statementAccount,
         designations: designations,
         path: req.url,
         errors: utils.errors(err.errors || err)
        });
      });
    }
  });  
}
