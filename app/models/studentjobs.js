const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const studentJobsSchema = new Schema({
    studentId: {
        type:String,
        unique:true,
        required:true
    },
    jobId: {
        type:String
    },
    appliedStatus: {
        type:String
    },
    selectedStatus: {
        type:String
    },
    eligibilityStatus: {
        type:String
    },
    academicYear: {
        type:String,
        required:true
    }
});

module.exports=mongoose.model('StudentJobs',studentJobsSchema);
