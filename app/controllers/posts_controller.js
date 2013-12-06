/**
* Module dependencies.
*/

var mongoose = require('mongoose')
 ,  utils = require('../../lib/utils')
 ,  _ = require('underscore')
 ,  Post = mongoose.model('Post');

/**
* Add a new post 
*/

exports.add = function (req, res) {
	res.render('posts/add', { 
    title: 'Add a Post',
    posts: new Post({})
  });
}

/**
* save new post details
*/

exports.save = function (req, res) {
var post = new Post(req.body);
console.log(post);
post.save(function (err,docs) {
  if (!err) 
  {   req.flash('success', 'successfully added a post');
   	  res.redirect('/posts/list');
      console.log('new post details saved successfully');
  }  
  else
  {	
  	res.render('posts/add', {
      title: 'Add a Post',
      posts: post,
      errors: utils.errors(err.errors || err)
    });
  	console.log(err);
  }
});
}

//Show List of Designation

exports.show =function(req,res){
Post.find (function (err,post) {
  if(err)
    console.error('No data found')
  else
  {
    console.log(post);
    res.render('posts/show', {
            title: 'Posts',
            posts:post
        });    
}
});
}

//Delete Entry from posts collection

exports.destroy =function(req,res){
Post.findByIdAndRemove(req.param('_id'),function (err)  {
    if(err)
    {
        req.flash('errors','not deleted');
        console.error('Data not Removed');
    }
    else
    { 
      req.flash('success','successfully deleted');
      res.redirect('/posts/list');
    }
 });
}

//render edit data page
exports.edit =function(req,res){
      Post.findById(req.param('_id'),function (err,post) {
            if(err)
              console.error('Data not Received')
            else
            {   console.log('Data Received')
               res.render('posts/edit',{
                title:'Posts',
                po:post
           });
          }
       });
}

//save updated info
exports.update =function(req,res){
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
