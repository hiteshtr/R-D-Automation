var mongoose = require('mongoose')
 , Faculty = mongoose.model('Faculty')
 , Department = mongoose.model('Department')
 , Post = mongoose.model('Post')

var utils = require('../../../lib/utils')
  , _ = require('underscore');

exports.index = function (req, res) {
	Department.find (function (err,depts) {
		 Post.find (function (err,post) {

	          res.render('faculty/index',{
	          title: 'Faculty',
	          dept:depts,
              posts:post
         });
});
});
}

//save info
exports.store = function (req, res) {
new Faculty({
	faculty_name: req.body.faculty_name,
    faculty_dept_id: req.body.faculty_dept_id,
    faculty_desig_id: req.body.faculty_desig_id,
    faculty_email: req.body.faculty_email,
    faculty_password: req.body.faculty_password    	
}).save(function (err,docs) {
  if (!err) 
  {    req.flash('success', 'successfully saved');
   	   res.redirect('/faculty/list');
       console.log('save successfully');
  }  
  else
  {
	  	req.flash('errors', 'not saved');
	  	if(err.errors.faculty_name)
	  	{
	  		req.flash('warning','Faculty Name must be Filled and must be 30 max Characters');
	  	}
	  	if(err.errors.faculty_email)
	  	{
	  		req.flash('warning','Faculty Email must be Filled & correct ID');
	  	}
	  	if(err.errors.faculty_password)
	  	{
	  		req.flash('warning','Faculty Password must be Filled and must be 20 max Characters');
	  	}
	  	
	  	res.redirect('/faculty');
	  	console.log('not saved');
	  	console.log(err);
	  	res.end();
  }
});
}

//show department list
exports.show =function(req,res){
Faculty.find (function (err,faculty) {
	Department.find (function (err,depts) {
		Post.find (function (err,post) {
      if(err)
        console.error('No data found')
       else
        {
           console.log(faculty);
           res.render('faculty/show', {
              title: 'Faculty',
              facs:faculty,
              dept:depts,
              posts:post
     });    
}
});
});
});
}

//delete a data from list
exports.destroy =function(req,res){
Faculty.findByIdAndRemove(req.param('_id'),function (err)  {
       if(err)
       {
          req.flash('errors','not deleted');
          console.error('Data not Removed');
       }
       else
       { 
        req.flash('success','successfully deleted');
        res.redirect('/faculty/list')
       }
 });     
}

//render edit data page
exports.edit =function(req,res){
   Faculty.findById(req.param('_id'),function (err,facs) {
      Department.find (function (err,depts) {
        Post.find (function (err,posts) {

            if(err)
              console.error('Data not Received')
            else
            {   console.log('Data Received')
               res.render('faculty/edit',{
                title:'Faculty',
                fac:facs,
                dept:depts,
                post:posts
           });
          }
       });
      });
    });
}

//save updated info
exports.update =function(req,res){
  Faculty.findById(req.param('_id'),function (err,docs){   
           docs.faculty_name = req.body.faculty_name;
           docs.faculty_dept_id = req.body.faculty_dept_id;
           docs.faculty_desig_id = req.body.faculty_desig_id;
           docs.save(function (err) {
             if (!err) 
             {   req.flash('success', 'successfully updated');
                 res.redirect('/faculty/list');
                 console.log('save successfully');
             }  
             else
             {
               req.flash('errors', 'not saved');    
               if(err.errors.faculty_name)
                {
                  req.flash('warning','Faculty Name must be Filled and must be 30 max Characters');
                }      
               res.redirect('/faculty/list');
               console.log('not saved');
               console.log(err);
               res.end();
             }
});
 
  });
}
