var mongoose = require('mongoose')
, Post = mongoose.model('Post')
var utils = require('../../../lib/utils')
  , _ = require('underscore');

exports.index = function (req, res) {
	res.render('posts/index',{ title: 'Posts'});
}

//save info
exports.store = function (req, res) {
new Post({
	  post_name: req.body.post_name,
    post_type: req.body.post_type,
    post_qualification: req.body.post_qualification,
    post_desig: req.body.post_desig,   
        	
}).save(function (err,docs) {
  if (!err) 
  {    req.flash('success', 'successfully saved');
   	   res.redirect('/posts/list');
       console.log('save successfully');
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
	  	res.redirect('/posts');
	  	console.log('not saved');
	  	console.log(err);
	  	res.end();
  }
});
}

//show department list
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

//delete a data from list
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
  Post.findById(req.param('_id'),function (err,docs) { 
    docs.post_name = req.body.post_name;
    docs.post_type = req.body.post_type;
    docs.post_qualification = req.body.post_qualification;
    docs.post_desig = req.body.post_desig;   
    docs.save(function (err) {
             if (!err) 
             {   req.flash('success', 'successfully updated');
                 res.redirect('/posts/list');
                 console.log('save successfully');
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
               console.log('not saved');
               console.log(err);
               res.end();
             }
});
 
  });
}
