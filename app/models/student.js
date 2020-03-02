const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const studentSchema = new Schema({
  studentId: Number,
  studentName: String,
  studentEmail: String,
  studentContact: Number,
  studentGender: String,
  studentDob: Date,
  studentDept: String,
  studentTempAddress: String,
  studentPermanentAddress: String,
  //studentCity: String,
  //studentState: String,
  //studentPincode: Number,
  studentBatch: String,
  studentSSCMarks: Number,
  studentInterMarks: Number,
  studentDiplomaMarks: Number,
  studentBTechMarks: Number,
});
module.exports=mongoose.model('Student',studentSchema);
