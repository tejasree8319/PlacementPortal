const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlacementSchema = new Schema(
  {
    studentId: {
      type: ObjectId,
      ref: 'Student',
      unique: true,
      required: true
    },
    companyId: {
      type: ObjectId,
      ref: 'Company'
    },
    jobId: {
      type: ObjectId,
      ref: 'Job'
    },
    academicYear: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
PlacementSchema.pre('findOne', function() {
  this.populate({ path: 'studentId', select: 'studentId-_id' });
});
PlacementSchema.pre('find', function() {
  this.populate({ path: 'studentId', select: 'studentId-_id' });
});
PlacementSchema.pre('findOne', function() {
  // console.log('entered here');
  this.populate({ path: 'companyId' });
});
PlacementSchema.pre('find', function() {
  this.populate({ path: 'companyId' });
});
PlacementSchema.pre('findOne', function() {
  // console.log('entered here');
  this.populate({ path: 'jobId' });
});
PlacementSchema.pre('find', function() {
  this.populate({ path: 'jobId' });
});
module.exports = mongoose.model('Placement', PlacementSchema);
