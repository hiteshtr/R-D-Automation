/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');



/**
*Approval for Advertisement Form Schema
*/

var AdvertisementSchema = new Schema({
  project_no: { type: String, default: '', validate:[validate.empty,'Project number is required.'] },
  project_title: { type: String, default: '', validate:[validate.empty ,'Project title is required.'] },
  position_advertise: { type: Schema.ObjectId, ref: 'Designation', validate:[validate.empty,'Position to be advertised is required.'] },
  salary_range: { type: String, default: '', validate:[validate.empty,'Salary range is required.'] },
  chairman: {type: String, default: '', validate:[validate.empty ,'Chairman name is required.'] },
  member1: {type: String, default: '', validate:[validate.empty ,'Member name is required.'] },
  member2: {type: String, default: '', validate:[validate.empty ,'Member name is required.'] },
  convenor: {type: String, default: '', validate:[validate.empty ,'Convenor/ Project Investigator name is required.'] }

});

/*Approval for Advertisement Form Model */

mongoose.model('ApprovalAdvertisement', AdvertisementSchema);
