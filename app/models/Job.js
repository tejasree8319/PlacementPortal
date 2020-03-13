const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema({
    jobId: {
      type:String,
      unique:true,
      required:true
    },
    jobProfile: {
      type:String,
      required:true
    },
    jobSkills: {
      type:String,
      required:true
    },
    jobDescription: {
      type:String,
      required:true
    },
    jobEligibility: {
      type:Number,
      required:true
    },
    jobPackage: {
      type:Number,
      required:true
    },
    jobLocation: {
      type:String
    },
    jobDate: {
      type:Date
    },
    jobDept: {
      type:String,
      required:true
    },
    jobType: {
      type:String
    }
  });
  module.exports=mongoose.model('Job',jobSchema);
  