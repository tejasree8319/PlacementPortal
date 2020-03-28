const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema(
  {
    jobProfile: {
      type: String,
      required: true
    },
    jobSkills: {
      type: String,
      required: true
    },
    companyId: {
      type: ObjectId,
      ref: 'Company'
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
  // this.populate({ path: 'companyId', select: 'companyId-_id' });
  this.populate({ path: 'companyId' });
});
jobSchema.pre('find', function() {
  this.populate({ path: 'companyId' });
});
module.exports = mongoose.model('Job', jobSchema);
