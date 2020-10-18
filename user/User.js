var mongoose = require('mongoose');
var uuid = require('uuid');
var UserSchema = new mongoose.Schema({
  user_id:{ type: String, default: uuid.v1 },
  name: { type: String, required: true, index: true },
  password: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true, unique: true, index: true },
  date_created: { type: Number, index: true },
  date_modified: { type: Number },
  accountNumber: { type: Number, required: true, unique: true, index: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'date_modified' } });
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');

