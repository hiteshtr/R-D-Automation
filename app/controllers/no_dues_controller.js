/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')    
 ,  NoDues=mongoose.model('NoDues');

/**
* no Dues Form
*/

exports.noDuesForm = function (req, res) {
  res.render('no_dues/no_dues',{
      title: 'No Dues Form',
      noDues: new NoDues({})
  });
}


/**
*No Dues Form data Save
*/

exports.save = function (req, res) {

  var noDues = new NoDues(req.body);
  console.log(noDues);
  noDues.save(function (err,info) {
    if (!err) 
    {    req.flash('success','Form has been submitted successfully');
     	   res.redirect('/no_dues');
    }  
    else
    {
    	
      res.render('no_dues/no_dues',{
          title:'No Dues Form',
          noDues:noDues,
          errors: utils.errors(err.errors || err)
      });
      console.log(err);
    }
    
  });

}