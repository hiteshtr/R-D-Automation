/*!
 * Mongoose Validate
 */

/**
 * Module Dependencies
 */

var check = require('validator'),
    validate = {};


/**
 * .email
 *
 * @param {String} value
 *
 * @api public
 */
validate.email = function (value) {
  try {
    check.isEmail(value);
  
  } catch(err) {
    return false;
  }
  return true;
};


validate.emailOrBlank = function (value) {
  try {
    if(value!=='')
    check(value).isEmail();
  
  } catch(err) {
    return false;
  }
  return true;
};
/**
 * .address
 *
 * @todo: Add address validation
 *        firstName
 *        lastName
 *        organisation
 *        address1..4
 *        suburb
 *        city
 *        country
 */

// Check out validator.checks validation

/**
 * .alpha
 *
 * @param {String} value
 *
 * @api public
 */
validate.alpha = function (value) {
  try {
    check(value).isAlpha();
  } catch(err) {
    return false;
  }
  return true;
};

/**
 * .alphanumeric
 *
 * @param {String|Number} value
 *
 * @api public
 */
validate.alphanumeric = function (value) {
  try {
    check(value).isAlphanumeric();
  } catch(err) {
    return false;
  }
  return true;
};

/**
 * .numeric
 *
 * @param {String|Number} value
 *
 * @api public
 */
validate.numeric = function (value) {
  try {
    check(value).isNumeric();
  } catch(err) {
    return false;
  }
  return true;
};

/**
 * .int
 *
 * @param {String|Number} value
 *
 * @api public
 */
validate.isInt = function (value) {
  try {
    check(value).isInt();
  } catch(err) {
    return false;
  }
  return true;
};

/**
 * .postalCode
 *
 * Postal Codes should be between 3 and 10 alphanumeric characters according
 * to http://en.wikipedia.org/wiki/Postal_code
 *
 * @param {String|Number} value
 *
 * @api public
 */
validate.postalCode = function (value) {
  try {
    check(value).len(3, 10).regex(/^[a-zA-Z0-9]+[ -]{0,1}[a-zA-Z0-9]+$/);
  } catch(err) {
    return false;
  }
  return true;
};

/**
 * .permalink
 *
 * @param {String|Number} value
 *
 * @api public
 */
validate.permalink = function (value) {
  try {
    check(value).regex(/^[a-z0-9\-]+$/);
  } catch(err) {
    return false;
  }
  return true;
};

validate.numericOrBlank = function (value) {
  try {
    if(value!=='')
    check(value).isNumeric();
  } catch(err) {
    return false;
  }
  return true;
};


validate.alphaWithSpace = function (value){
  try{
    check(value).notEmpty().regex(/^[a-zA-Z\s]+$/);
  }catch(err){
    return false;
  }
    return true;

};

validate.alphanumericWithSpace = function (value){
  try{ 
    check(value).notEmpty().regex(/^[a-zA-Z0-9\s]+$/);
  }catch(err){
    return false;
  }
    return true;

};

validate.empty = function (value){
  try{
    check(value).notEmpty();
  }catch(err){
    return false;
  }
    return true;

};


/**
 * Module Exports
 */

module.exports = exports = validate;

