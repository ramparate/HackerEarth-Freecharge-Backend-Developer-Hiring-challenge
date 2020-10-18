var mongoose = require('mongoose');
var uuid = require('uuid');
var BankSchema = new mongoose.Schema({
  transaction_id:{ type: String, default: uuid.v1 },
  date_created: { type: Number, index: true },
  date_modified: { type: Number },
  status: { type: String, required: true, index: true },
  Withdraw: { type: Number, index: true, default: 0 },
  Deposit: { type: Number, index: true, default: 0 },
  balance: { type: Number, index: true, default: 0 },
  user_id:{ type: String, required: true, index: true },
  accountNumber: { type: Number, required: true,index: true },
  Description: { type: String, index: true, default: 0 },
  Date: { type: String, index: true },
  Closing_Balance:{ type: Number, index: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'date_modified' } });
mongoose.model('Bank', BankSchema);
module.exports = mongoose.model('Bank');