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
        name: { type: String, default: '' },
        designation: { type: String, default: '' },
        amount: { type: Number, default: '' },
        bankacno: { type: String, default: '' },
        pan: { type: String, default: '' }
    }
  ],
  total_amount: { type:Number, default:''}
});


/*Disbursement Honorarium Form Model */

mongoose.model('DisbursementHonorarium', DisbursementSchema);
