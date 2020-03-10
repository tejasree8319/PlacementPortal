const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const studentJobsSchema = new Schema({
    studentId: String,
    jobId: String,
    appliedStatus: String,
    selectedStatus: String,
    eligibilityStatus: String,
    academicYear: String
});

module.exports=mongoose.model('StudentJobs',studentJobsSchema);
