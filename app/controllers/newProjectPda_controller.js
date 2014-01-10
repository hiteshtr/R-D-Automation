/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  NewProject = mongoose.model('NewProject');

/**
* New Project / PDA registration Form
*/

exports.add = function (req, res) {
	res.render('new_project_pda_registration/add',{ 
      title: 'Form for New Project/PDA Registration ',
      newProject:new NewProject({}),
      path:req.url
  });
}

/**
* New Project / PDA registration Form data Save
*/

exports.save = function(req, res) {
  var newProject= new PDA(req.body);
  newProject.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/new_project_pda_registration');
    }
    else
    {
       console.log(err); 
       return res.render('new_project_pda_registration/add',{
            title: 'Form for New Project/PDA Registration ',
            newProject:newProject,
            path:req.url,
            errors: utils.errors(err.errors || err)

        });
      }
  });
};


