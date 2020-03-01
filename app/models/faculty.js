const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const facultySchema = new Schema({
  facultyId: Number,
  facultyName: String,
  facultyEmail: String,
  facultyContact: Number,
  facultyGender: String,
  facultyDesignation: String,
  facultyExperience: Number,
  facultyDept: String,
  
});
module.exports=mongoose.model('Faculty',facultySchema);

