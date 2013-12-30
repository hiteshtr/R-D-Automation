var mongoose = require('mongoose')
	, Project = mongoose.model('Project')
	, Department = mongoose.model('Department')
	, Projectclass = mongoose.model('Projectclass');

var utils = require('../../lib/utils')
	, _ = require('underscore')
	, async = require('async');

exports.new_project = function (req, res) {
	async.parallel([
	   function(callback){
	      Projectclass.find({}, function (err, projectclass) {
	      	if (err) {
	      		callback(err, null);
	      	};
	      	callback(null, projectclass);
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
	   		res.render('users/index', {
	   			path: req.url,
				errors: utils.errors(err.errors)
			});
	   };
		res.render('project/new_project',{
			project: new Project({}),
			path: req.url,
			dept: results[1],
			pclasses: results[0],
			title: 'Add new project details'
		});
	});   
}

exports.save = function (req, res) {
	var project = new Project(req.body);

	async.parallel([
	   function(callback){
	      Projectclass.find({}, function (err, projectclass) {
	      	if (err) {
	      		callback(err, null);
	      	};
	      	callback(null, projectclass);
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
	   		res.render('users/index', {
	   			path: req.url,
				errors: utils.errors(err.errors)
			});
	   };
		project.save(function (err) {
			if (err) {
				return res.render('project/new_project', {
			        errors: utils.errors(err.errors || err),
			        path: req.url,
					dept: results[1],
					pclasses: results[0],
			        title: 'Add new project details'
			      })
			}
			req.flash('success', 'successfully saved project details');
			res.redirect('/project/list');
		});
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
					errors: utils.errors(err.errors || err)	
				});
	   		};
   		res.render('project/show', {
			title: 'List of Projects',
			projects: result,
		});
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