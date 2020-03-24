const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const companySchema = new Schema(
  {
    companyId: {
      type: Number,
      required: true,
      unique: true
    },
    companyName: {
      type: String
    },
    companyDescription: {
      type: String
    },
    // companySelectionProcess: {
    //   type: String
    // },
    // companyRecruited: {
    //   type: Number
    // },
    companySector: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Company', companySchema);
