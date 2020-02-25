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
  studentAddress: String,
  
});
module.exports=mongoose.model('Student',studentSchema);
