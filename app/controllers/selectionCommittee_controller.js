/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  SelectionCommittee = mongoose.model('SelectionCommittee');

/**
* selection committee Form
*/

exports.add = function (req, res) {
	res.render('selectionCommittee/add',{ 
      title: 'Report of the Selection Committee',
      selection: new SelectionCommittee({}),
      path: req.url
  });
}

/**
* selection committee Form data save
*/

exports.save = function(req, res) {
  var selection= new SelectionCommittee(req.body);
  selection.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/selection_committee');
    }
    else
    {
      console.log(err);
      console.log(err.code);   
	    return res.render('selectionCommittee/add',{
	      title: 'Report of the Selection Committee',
	      selection: selection,
	      path: req.url,
	      errors: utils.errors(err.errors || err)
      });
    }
  });  
}
