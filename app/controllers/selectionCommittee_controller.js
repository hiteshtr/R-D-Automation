/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Designation = mongoose.model('Designation')  
 ,  SelectionCommittee = mongoose.model('SelectionCommittee');

/**
* selection committee Form
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) {  
    if(err)
    {
      console.log(err);
    }
    else
    {
    	res.render('selectionCommittee/add',{ 
          title: 'Report of the Selection Committee',
          selection: new SelectionCommittee({}),
          designations: designations,
          path: req.url
      });
    }
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
      Designation.find (function (err1,designations) {  
        if(err1)  
        {
          console.log(err1);
        }  
        else
        { 
    	    return res.render('selectionCommittee/add',{
    	      title: 'Report of the Selection Committee',
            designations: designations,
    	      selection: selection,
    	      path: req.url,
    	      errors: utils.errors(err.errors || err)
          });
        }
      });
    }
  });  
}
