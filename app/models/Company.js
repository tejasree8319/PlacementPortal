const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const companySchema = new Schema(
  {
    companyName: {
      type: String
    },
    companyDescription: {
      type: String
    },
    companySector: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Company', companySchema);
