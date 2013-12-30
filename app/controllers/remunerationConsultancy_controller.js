/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Remuneration = mongoose.model('Remuneration')  

/**
* remuneration_or_consultancy_fees Form
*/

exports.add = function (req, res) {
	res.render('remuneration_or_consultancy_fees/add',{ 
      title: 'Request for release of remuneration / consultancy fees ',
      remunerationConsultancy: new Remuneration({}),
      path: req.url
  });
}

/**
* remuneration_or_consultancy_fees Form data save
*/

exports.save = function(req, res) {
  var remunerationConsultancy= new Remuneration(req.body);
  remunerationConsultancy.save(function (err,info) {
    if (!err) 
    {
    req.flash('success', 'Form has been submitted successfully');
    res.redirect('/remuneration_or_consultancy_fees');
    }
    else
    {    
      return res.render('remuneration_or_consultancy_fees/add',{
       title: 'Request for release of remuneration / consultancy fees ',
       remunerationConsultancy: remunerationConsultancy,
       path: req.url,
       errors: utils.errors(err.errors || err)
     });
    }
  });  
}
