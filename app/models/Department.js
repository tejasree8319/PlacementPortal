const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const departmentSchema = new Schema(
  {
    departmentName: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', departmentSchema);
