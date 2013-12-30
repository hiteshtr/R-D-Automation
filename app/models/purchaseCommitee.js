/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');


/**
*Purchase Committee Below 5 Lakh Form Schema
*/

var PurchaseSchema = new Schema({
  above_5_lakh: { type: Boolean, default: '', validate:[validate.empty,'Fund is required.'] },
  project_no: { type: String, default: '', validate:[validate.empty,'Project number is required.'] },
  project_title: { type: String, default: '', validate:[validate.empty,'Project title is required.'] },
  equipment_name: { type: String, default: '', validate:[validate.empty ,'Equipment name is required.'] },
  equipment_cost: { type : Number, default: '', min:50001, validate:[validate.empty ,'Equipment cost is required.'] }
});


/*Purchase Committee Below 5 Lakh Form Model */

mongoose.model('PurchaseCommittee', PurchaseSchema);
