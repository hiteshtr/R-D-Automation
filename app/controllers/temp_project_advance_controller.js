/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')    
 ,  TemporaryProjectAdvance=mongoose.model('TemporaryProjectAdvance');

/**
* Temporary Project Advance Form
*/

exports.tmpProAdvncForm = function (req, res) {
  res.render('temp_project_advance/temp_project_advance',{
      title: 'Temporary Project Advance Form',
      tempPrjAdvance: new TemporaryProjectAdvance({})
  });
}


/**
*Temporary Project Advance Form data Save
*/
exports.save = function (req, res) {

  var tempPrjAdvance = new TemporaryProjectAdvance(req.body);
  tempPrjAdvance.save(function (err,info) {
    if (!err) 
    {    req.flash('success','Form has been submitted successfully');
     	   res.redirect('/temp_project_advance');
    }  
    else
    {
    	
      res.render('temp_project_advance/temp_project_advance',{
          title:'Temporary Project Advance Form',
          tempPrjAdvance:tempPrjAdvance,
          errors: utils.errors(err.errors || err)
      });
    	console.log(err);
    }
    
  });

}