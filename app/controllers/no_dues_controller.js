/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')  
 ,  Designation = mongoose.model('Designation')  
 ,  NoDues=mongoose.model('NoDues');

/**
* no Dues Form
*/

exports.add = function (req, res) {
  Designation.find (function (err,designations) {
    res.render('no_dues/add',{
        title: 'No Dues Form',
        designations:designations,
        noDues: new NoDues({}),
        path:req.url
    });
  });
}


/**
*No Dues Form data Save
*/

exports.save = function (req, res) {

  var noDues = new NoDues(req.body);
  noDues.save(function (err,info) {
    if (!err) 
    {    req.flash('success','Form has been submitted successfully');
     	   res.redirect('/no_dues');
    }  
    else
    {
    	Designation.find (function (err1,designations) {
        return res.render('no_dues/add',{
          title:'No Dues Form',
          noDues:noDues,
          designations:designations,
          path:req.url,
          errors: utils.errors(err.errors || err)
        });
      });
    }
    
  });

}