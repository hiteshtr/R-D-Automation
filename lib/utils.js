/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errors = function (errors) {
  console.log(errors);
  var keys = Object.keys(errors);
  var errs = [];

  // if there is no validation error, just display a generic error
  if (!keys) {
    return ['Oops! There was an error'];
  }

  loop:
  keys.forEach(function (key) {
    if ( errors[key].message == undefined ) {
      if (key == "message") {
        errs.push(errors[key])
      };
    };
    if ( errors[key].message != undefined ) {
      errs.push(errors[key].message);
    };
  });
  return errs;
}