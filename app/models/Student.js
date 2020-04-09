const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentId: {
      type: String,
      unique: true,
      // required: true
    },
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      // unique: true
      required: true,
    },
    studentContact: {
      type: Number,
      // unique: true
      required: true,
    },
    studentGender: {
      type: String,
      required: true,
    },
    studentDob: {
      type: Date,
      required: true,
    },
    studentDept: {
      type: String,
      required: true,
    },
    studentTempAddress: {
      type: String,
    },
    studentPermanentAddress: {
      type: String,
      required: true,
    },
    studentBatch: {
      type: String,
      required: true,
    },
    studentSSCMarks: {
      type: Number,
      required: true,
    },
    studentInterMarks: {
      type: Number,
      required: true,
    },
    studentDiplomaMarks: {
      type: Number,
    },
    studentBTechMarks: {
      type: Number,
      required: true,
    },
    studentResume: {
      type: String,
      required: true,
    },
    studentPhoto: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Student', studentSchema);
