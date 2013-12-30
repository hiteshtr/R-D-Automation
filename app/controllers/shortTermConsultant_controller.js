/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  ShortTermConsultant = mongoose.model('ShortTermConsultant');

/**
* Students in Projects Form
*/

exports.add = function (req, res) {
	res.render('shortTermConsultant/add',{ 
      title: 'Request for engaging short-term Consultants ',
      shortTerm:new ShortTermConsultant({}),
      path:req.url
  });
}

/**
* Students in Project Form data Save
*/

exports.save = function(req, res) {
  var shortTerm= new ShortTermConsultant(req.body);
  shortTerm.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/short_term_consultant');
    }
    else
    {
       console.log(err); 
       return res.render('shortTermConsultant/add',{
            title: 'Request for engaging short-term Consultants ',
            shortTerm:shortTerm,
            path:req.url,
            errors: utils.errors(err.errors || err)

        });
      }
  });
};


