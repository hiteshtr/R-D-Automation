/**
* Module dependencies.
*/
var validate = require('../../lib/validate.js')
 ,  mongoose = require('mongoose')
 ,  Schema = mongoose.Schema
 ,  _ = require('underscore');

/**
 * Requisition_for_payment Schema
 */

var RequisitionPaymentSchema = new Schema({
  requisition: { type: Boolean, default:'', validate:[validate.empty,'Either payment or reimbursement must be chosen.'] },
  project_investigator_name: { type: String, default:'', validate: [validate.alphaWithSpace,'Project Investigator name is required and must be alphabates.'] },
  pf_no: { type: String, default:'', validate:[validate.empty,'PF No. is required.'] },
  project_no: { type: String, default:'', validate:[validate.empty,'Project No. is required.'] },
  budget_head: { type: String, default:'', validate:[validate.empty,'Budget head is required.'] },
  payment: { type: String, default:'',  validate:[validate.empty,'Payment to be made in the name of field must be filled.'] },
  bank_account_no: { type: String, default:'', validate:[validate.numeric,'Bank account number must be numeric.'] },
  details:[
    {
      invoice_bill: { type: String, default: '', validate:[validate.empty,'Invoice bill no. is required.'] },
      date: { type: Date, default: '', validate:[validate.empty,'Date is required.'] },
      item_purchase: { type: String, default: '', validate:[validate.empty,'Item is required.'] },
      amount: { type: Number, default: '', validate:[validate.empty,'Amount is required.'] },
      stock_register: { type: String, default: '', validate:[validate.empty,'Stock register is required.'] }
    }
  ],
  total_amount: { type: Number, default:'', max:50000, required:true }
});

/**
 * Requisition_for_payment Model
 */

mongoose.model('RequisitionForPayment', RequisitionPaymentSchema);
