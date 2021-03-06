/**
* Module dependencies.
*/
var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  async = require('async')
 ,  Projectclass = mongoose.model('Projectclass');


exports.add_projectclass = function (req, res) {
	res.render('projectclass/add_projectclass',{ 
    title: 'Project Class',
    path: req.url
 });
}

//save info
exports.save = function (req, res) {
 var projectClass = new Projectclass(req.body);
  projectClass.save(function (err,docs) {
      if (!err) 
      {    
        req.flash('success', 'Project class added successfully.');
        res.redirect('/projectclass/list');
      }  
      else
      { 
        Projectclass.find(function (err1,projectclasses) {
         if(err1)
          console.error('No data found')
         else
         {
          res.render('projectclass/show',{
                  title: 'Add project class',
                  projectclasses: projectclasses,
                  path: req.url,
                  errors: utils.errors(err.errors || err)
               });
        console.log(err);   
        }
      });
    }
  });
}

//show project class list
exports.show =function(req,res){
  Projectclass.find (function (err,projectclasses) {
    if(err)
      console.error('No data found')
    else
    {
      res.render('projectclass/show', {
          title: 'Project Class',
          projectclasses: projectclasses,
          path: req.url
      });   
    }
  });
}


//delete a data
exports.destroy =function(req,res){
  Projectclass.findByIdAndRemove(req.param('_id'),function (err)  {
      if(err)
      {
          req.flash('errors','not deleted');
          console.error('Data not Removed')
      }
      else
      { 
        req.flash('success','successfully deleted')
        res.redirect('/projectclass/list');
      }
  });
}


//render edit data page
exports.edit =function(req,res){
  Projectclass.findById(req.param('_id'),function (err,pclass) {
        if(err)
          console.error('Data not Received')
        else
        {
          res.render('projectclass/edit',{
          title:'Project Class',
          pc:pclass
       });
      }
   });
}

 
//save updated info
exports.update =function(req,res){
  Projectclass.findById(req.param('_id'),function (err,docs) { 
    docs.project_class_code = req.body.pclasscode_name;
    docs.project_class = req.body.pclass_name;
    docs.save(function (err, data) {
             if (!err) 
             {   
                req.flash('success', 'successfully updated');
                res.redirect('/Projectclass/list');
             }  
             else
             {
               req.flash('errors', 'not saved');    
               if(err.errors.project_class_code)
                {
                  req.flash('warning','Project Class Code must be Filled and must be  20 Characters');
                }
               if(err.errors.project_class)
                {
                  req.flash('warning','Project Class Name must be Filled and must be max 30 Characters');
                } 
               res.redirect('/Projectclass/list');
               console.log(err);
               res.end();
             }
   });
 });
}

