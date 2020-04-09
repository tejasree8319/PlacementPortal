const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema(
  {
    jobProfile: {
      type: String,
      required: true,
    },
    jobSkills: {
      type: String,
      required: true,
    },
    companyId: {
      type: ObjectId,
      ref: 'Company',
      required: true,
    },
    selectedCount: {
      type: Number,
      default: 0,
      required: true,
    },
    jobSelectionProcess: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobEligibility: {
      type: String,
      required: true,
    },
    jobPackage: {
      type: Number,
      required: true,
    },
    interviewLocation: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobDate: {
      type: Date,
      required: true,
    },
    // jobDept: {
    //   type: String,
    //   required: true
    // },
    jobType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
jobSchema.pre('findOne', function () {
  console.log('entered here');
  // this.populate({ path: 'companyId', select: 'companyId-_id' });
  this.populate({ path: 'companyId' });
});
jobSchema.pre('find', function () {
  this.populate({ path: 'companyId' });
});
module.exports = mongoose.model('Job', jobSchema);
