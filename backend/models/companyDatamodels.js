const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  open: {
    type: String,
    required: true,
  },
  high: {
    type: String,
    required: true,
  },
  low: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
  adjclose: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
}
);
const companyModel = mongoose.model("company", companySchema);
module.exports = companyModel;
