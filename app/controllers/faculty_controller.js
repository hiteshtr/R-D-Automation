/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  Faculty = mongoose.model('Faculty')
 ,  Department = mongoose.model('Department')
 ,  Post = mongoose.model('Post');

 /**
* Add new Faculty form
*/

exports.add_faculty = function (req, res) {
	 Department.find (function (err,departments) {
		  Post.find (function (err,posts) {
        res.render('faculty/add',{
	          title: 'Faculty',
            departments:departments,
            posts:posts,
            faculty: new Faculty({})
         });
      });
  });
}

/**
* Faculty details save
*/

exports.save = function (req, res) {
  var faculty=new Faculty(req.body);
  faculty.save(function (err,docs) {
    if (!err) 
      {   req.flash('success', 'successfully saved');
   	      res.redirect('/faculty/list');
          console.log('save successfully');
      }  
    else
      {  
        console.log(err);
        Department.find (function (err1,departments) {
          Post.find (function (err2,posts) {
            return res.render('faculty/add',{
              title: 'Faculty',
              departments:departments,
              posts:posts,
              errors: utils.errors(err.errors || err),
              faculty:faculty
            });
          });
        });
      }
  });
}

/**
* show faculty list
*/

exports.show =function(req,res){
  var departments, designations;

  Department.find({}, function (err, result) {
    if (err) {};
    departments = result;
  });

  Post.find({}, function (err, result) {
    if (err) {};
    designations = result;
  });

  Faculty
    .find()
    .populate('faculty_dept_id')
    .populate('faculty_desig_id')
    .exec(function (err, faculties) {
      if(err)
      {
        res.render('faculty/show', {
            title: 'Faculty',
            faculties:faculties,
            errors:utils.errors(err.errors)
        });
      } 
      else
      {
        res.render('faculty/show', {
            title: 'Faculty',
            faculties:faculties,
            departments:departments,
            designations:designations
        });    
      }
  });
}

/**
* Delete a faculty details from list
*/

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
      Department.find (function (err,departments) {
        Post.find (function (err,posts) {

            if(err)
              console.error('Data not Received')
            else
            {   console.log('Data Received')
               res.render('faculty/edit',{
                title:'Faculty',
                fac:facs,
                departments:departments,
                post:posts
           });
          }
       });
      });
    });
}

//save updated info
exports.update =function(req,res){
 /* console.log()
  Faculty.update({ "_id":req.body_id)}, 
                {$set: {"faculty_name":req.body.faculty_name , "faculty_dept_id":req.body.faculty_dept_id , "faculty_desig_id":req.body.faculty_desig_id}},
function(err,docs){
    if (!err) 
             {   req.flash('success', 'successfully updated');
                 res.redirect('/faculty/list');
                 console.log('save successfully');
             }  
             else
             {
               req.flash('errors', err);    
               res.redirect('/faculty/list');
               console.log('not saved');
               console.log(err);
               res.end();
             }
}
);
}*/
  Faculty.findById(req.body._id,function (err,docs){   
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
               res.redirect('/faculty/list');
               console.log('not saved');
               console.log(err);
               
             }
});
 
  });
}

/*exports.update =function(req,res){
  Post.findById(req.body._id, function (err, docs) { 
    docs.designation = req.body.designation;
    docs.designation_type = req.body.designation_type;
    docs.min_qualification = req.body.min_qualification;
    docs.staff_type = req.body.staff_type;
    docs.min_experience = req.body.min_experience   
    docs.save(function (err) {
             if (!err) 
             {   req.flash('success', 'successfully updated');
                 res.redirect('/posts/list');
             }  
             else
             {
               req.flash('errors', 'not saved');    
               if(err.errors.post_name)
                {
                  req.flash('warning','Post Name must be Filled and must be max 20 Characters');
                }
               if(err.errors.post_qualification)
                {
                  req.flash('warning','Post Qualification must be Filled and must be max 10 Characters');
                }
               res.redirect('/posts/list');
               console.log(err);
             }
});
 
  });
}
*/