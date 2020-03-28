const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FeedbackSchema = new Schema(
  {
    studentId: {
      type: ObjectId,
      ref: 'Student',
      required: true
    },
    jobId: {
      type: ObjectId,
      ref: 'Job',
      required: true
    },
    studentFeedback: {
      type: String
    }
  },
  { timestamps: true }
);
FeedbackSchema.pre('findOne', function() {
  //console.log('entered here');
  this.populate({ path: 'studentId' });
});
FeedbackSchema.pre('find', function() {
  //console.log('entered here');
  this.populate({ path: 'studentId' });
});

FeedbackSchema.pre('findOne', function() {
  //console.log('entered here');
  this.populate({ path: 'jobId' });
});
FeedbackSchema.pre('find', function() {
  //console.log('entered here');
  this.populate({ path: 'jobId' });
});
module.exports = mongoose.model('Feedback', FeedbackSchema);
