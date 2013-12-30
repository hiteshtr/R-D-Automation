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
  requisition: { type: Boolean, default:'' },
  project_investigator_name: { type: String, default:'' },
  pf_no: { type: String, default:'' },
  project_no: { type: String, default:'' },
  budget_head: { type: String, default:'' },
  payment: { type: String, default:'' },
  bank_account_no: { type: String, default:'' },
  details:[
    {
        invoice_bill: { type: String, default: '' },
        date: { type: String, default: '' },
        item_purchase: { type: String, default: '' },
        amount: { type: Number, default: '' },
        stock_register: { type: String, default: '' }
    }
  ],
  total_amount: { type: Number, default:'' }
});

/**
 * Requisition_for_payment Model
 */

mongoose.model('RequisitionForPayment', RequisitionPaymentSchema);
