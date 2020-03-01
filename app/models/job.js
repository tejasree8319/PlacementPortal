const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema({
    jobId: Number,
    jobProfile: String,
    jobSkills: String,
    jobDescription: String,
    jobEligibility: Number,
    jobPackage: Number,
    jobLocation: String,
    jobDate: Date,
    jobDept: String,
    jobType: String
  });
  module.exports=mongoose.model('Job',jobSchema);
  