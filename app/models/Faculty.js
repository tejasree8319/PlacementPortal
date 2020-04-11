const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const facultySchema = new Schema(
  {
    facultyId: {
      type: String,
      // required: true,
      unique: true,
    },
    facultyName: {
      type: String,
      // required: true,
    },
    facultyEmail: {
      type: String,
      // required: true,
      // unique: true
    },
    facultyContact: {
      type: Number,
      //unique: true
      // required: true,
    },
    facultyGender: {
      type: String,
      // required: true,
    },
    facultyDesignation: {
      type: String,
      // required: true,
    },
    facultyExperience: {
      type: Number,
      // required: true,
    },
    facultyDept: {
      type: String,
      // required: true,
    },
    facultyQualification: {
      type: String,
      // required: true,
    },
    facultyPhoto: {
      type: String,
      // required: true,
    },
    facultyResume: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Faculty', facultySchema);
