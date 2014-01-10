/**
* Module dependencies.
*/

var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
*Disbursement Honorarium Form Schema
*/

var DisbursementSchema = new Schema({
  pi_name: { type: String, default: '', validate:[validate.empty,'PI name is required.'] },
  pf_no: { type: String, default: '', validate:[validate.empty,'PF no. is required.'] },
  project_no: { type: String, default: '', validate:[validate.empty,'Project number is required.'] },  
  details:[
    {
      name: { type: String, default: '', validate:[validate.empty,'Name is required.'] },
      designation: { type: String, default: '', validate:[validate.empty,'designation is required.'] },
      amount: { type: Number, default: '', validate:[validate.empty,'Amount is required.'] },
      bankacno: { type: String, default: '', validate:[validate.empty,'Bank account no. is required.'] },
      pan: { type: String, default: '', validate:[validate.empty,'PAN no. is required.'] }
    }
  ],
  total_amount: { type:Number, default:'', validate:[validate.empty,'Total amount is required.']}
});


/*Disbursement Honorarium Form Model */

mongoose.model('DisbursementHonorarium', DisbursementSchema);
