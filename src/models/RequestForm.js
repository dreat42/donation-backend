const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    username: {type: String, required: true},
    title: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String, required: true},
    fundrequired: {type: Number, required: true},
    fundraised: {type: Number, required: true},
    upi: {type: String, required: true},
  },
  {
    timestamps: true,
  },
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
