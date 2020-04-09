const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    companySector: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Company', companySchema);
