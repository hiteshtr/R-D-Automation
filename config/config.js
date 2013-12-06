var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var templatePath = path.normalize(__dirname + '/../app/mailer/templates');

module.exports = {
  development: {
    db: 'mongodb://localhost/rndAutomation_dev',
    root: rootPath,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    }
  },
  test: {
    db: 'mongodb://localhost/rndAutomation_test',
    root: rootPath,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    }
  },
  production: {}
}