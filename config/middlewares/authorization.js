/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  res.locals.user = req.user || null;
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/login');
  }
  next();
};

/*
 *  User authorization routing middleware
 */

/*exports.user = {
  hasAuthorization : function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized');
      return res.redirect('/users/'+req.profile.id);
    }
    next();
  }
};*/