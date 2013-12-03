var mongoose = require('mongoose')
	, Project = mongoose.model('Project')
	, Department = mongoose.model('Department')
	, Projectclass = mongoose.model('Projectclass');

var utils = require('../../../lib/utils')
	, _ = require('underscore')
	, async = require('async');

exports.index = function (req, res) {
	 Department.find (function (err,depts) {
         Projectclass.find (function (err,pcs) {
	         res.render('project/index',{
	          title: 'Project',
	          dept:depts,
              pclasses:pcs
	         });
});
});	         
}

exports.store = function (req, res) {
	var project = new Project(req.body);
	project.save(function (err) {
		if (err) {
			return res.render('project/index', {
		        errors: utils.errors(err.errors),
		        title: 'Add new project details'
		      })
		}
		req.flash('success', 'successfully saved project details');
		res.redirect('/project/list');
	});
}

exports.show =function(req,res){
	Project
		.find()
		.populate('project_class_id')
		.populate('department_id')
		.exec(function (err, result) {
		  if (err) {
		   		res.render('project/show', {
					title: 'List of Projects',
					errors: utils.errors(err.errors)
				});
	   		};
   		res.render('project/show', {
			title: 'List of Projects',
			projects: result,
		});
		  // prints "The creator is Aaron"
	});
	/*async.parallel([
	   function(callback){
	      Project.find({}, function (err, project) {
	      	if (err) {
	      		callback(err, null);
	      	};
	      	callback(null, project);
	      });
	   },
	   function(callback){
	      Department.find({}, function (err, department) {
	      	if (err) {
	      		callback(err, null);
	      	};
	      	callback(null, department);
	      });
	   }
	], function (err, results){
	   if (err) {
	   		res.render('project/show', {
				title: 'List of Projects',
				errors: utils.errors(err.errors)
			});
	   };
		res.render('project/show', {
			title: 'List of Projects',
			projects: results[0],
			dept: results[1]
		}); 
	});*/
}

exports.info = function(req,res){
Project.findById (req.body.id,function (err,projects) {
	Project.find (function (err,allprojects){
		res.render('prasad/Projectinfo',{
			title:'Project',
			prj:projects,
			allprojects:allprojects,
		});
});
});
}