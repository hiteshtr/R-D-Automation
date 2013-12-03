var mongoose = require('mongoose')
 , Department = mongoose.model('Department')
var utils = require('../../../lib/utils')
  , _ = require('underscore');


exports.index = function (req, res) {
	res.render('department/index',{ title: 'Department'});
}

//save info
exports.store = function (req, res) {
new Department({
	    department: req.body.dept_name,
        	
}).save(function (err,docs) {
  if (!err) 
  {    
    req.flash('success', 'successfully saved');
   	res.redirect('/department/list');
    console.log('save successfully');
  }  
  else
  {
  	req.flash('errors', 'not saved');
  	if(err.errors.department)
  	{
  		req.flash('warning','Department Name must be Filled and must be max 30 Characters');
  	}  	
  	res.redirect('/department');
  	console.log('not saved');
  	console.log(err);
  	res.end();
  }
});
}

//show department list
exports.show =function(req,res){
Department.find(function (err,depts) {
  if(err)
    console.error('No data found')
  else
  {
    console.log(depts);
    res.render('department/show', {
            title: 'Department',
            dept:depts
        });
}
});
}


//delete a data from list
exports.destroy =function(req,res){
Department.findByIdAndRemove(req.param('_id'),function (err)  {
    if(err)
    {
        req.flash('errors','not deleted');
        console.error('Data not Removed');
    }
    else
    { 
      req.flash('success','successfully deleted');
      res.redirect('/department/list');
    }
 });
}

//render edit data page
exports.edit =function(req,res){
      Department.findById(req.param('_id'),function (err,depts) {
            if(err)
              console.error('Data not Received')
            else
            {   console.log('Data Received')
               res.render('department/edit',{
                title:'Department',
                dept:depts
           });
          }
       });
}

//save updated info
exports.update =function(req,res){
  Department.findById(req.param('_id'),function (err,docs) { 
    docs.department = req.body.dept_name;
    docs.save(function (err) {
             if (!err) 
             {   req.flash('success', 'successfully updated');
                 res.redirect('/department/list');
                 console.log('save successfully');
             }  
             else
             {
               req.flash('errors', 'not saved');    
               if(err.errors.department)
                {
                  req.flash('warning','Department Name must be Filled and must be max 30 Characters');
                }      
               res.redirect('/department/list');
               console.log('not saved');
               console.log(err);
               res.end();
             }
});
 
  });
}
