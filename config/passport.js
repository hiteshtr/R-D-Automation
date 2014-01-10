var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , User = mongoose.model('User')
  , LdapAuth = require('ldapauth');

/**
 * Create user
 */

var create = function (data) {
  console.log('into create user');
  var user = new User();
  user.name = data.cn;
  user.email = data.mail;
  user.username = data.uid;
  var tempDN1 = data.dn.split(',');
  var tempDN2 = tempDN1[1].split('=');
  user.group = tempDN2[1];
  user.save(function (err) {
    if (err) {
      return app.render('users/login', {
        errors: utils.errors(err.errors),
        user: user,
        title: 'Please login again'
      })
    }
  })
}

var options = {
    url: "ldap://172.16.100.6:389",
      adminDn: "uid=hiteshtr,ou=Project,ou=People,dc=iitj,dc=ac,dc=in",
      adminPassword: "trivedi@hitesh",
      searchBase: "dc=iitj,dc=ac,dc=in",
      searchFilter: "(uid={{username}})"
  };

var auth = new LdapAuth(options);


module.exports = function (passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    User.findOne({ email: user.mail }, function (err, user) {
      done(err, user._id);
    })
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use(new LocalStrategy(
    function(username, password, done) {
      auth.authenticate(username, password, function (err, user) {
        if (err) {
          return done(err);
        } if (!user) {
          return done(null, false, { message: 'Unknown user or invalid password' });
        }
        User.findOne({'email': user.mail }, function (err, person) {
          if (err) {
            req.flash('errors', err)
            console.log(err);
          } else{
            if (person == null) {
              create(user);
            };
            return done(null, user);
          };
        });
      });
    }
  ));
}
