const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema(
  {
    jobId: {
      type: ObjectId,
      ref: 'Company',
      unique: true,
      required: true
    },
    jobProfile: {
      type: String,
      required: true
    },
    jobSkills: {
      type: String,
      required: true
    },
    selectedCount: {
      type: Number
    },
    jobSelectionProcess: {
      type: String
    },
    jobDescription: {
      type: String,
      required: true
    },
    jobEligibility: {
      type: Number,
      required: true
    },
    jobPackage: {
      type: Number,
      required: true
    },
    interviewLocation: {
      type: String,
      required: true
    },
    jobLocation: {
      type: String
    },
    jobDate: {
      type: Date
    },
    // jobDept: {
    //   type: String,
    //   required: true
    // },
    jobType: {
      type: String
    }
  },
  { timestamps: true }
);
jobSchema.pre('findOne', function() {
  console.log('entered here');
  this.populate({ path: 'jobId', select: 'companyId-_id' });
});
jobSchema.pre('find', function() {
  this.populate({ path: 'jobId', select: 'companyId-_id' });
});
module.exports = mongoose.model('Job', jobSchema);
