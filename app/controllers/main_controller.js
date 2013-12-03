var utils = require('../../lib/utils')

exports.home = function (req, res) {
	res.render('users/index',{ title: 'Research and Development Automation'});
}