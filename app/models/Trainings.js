const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TrainingSchema = new Schema(
  {
    studentId: {
      type: ObjectId,
      ref: 'Student'
    },
    trainingType: {
      type: String
    }
  },
  { timestamps: true }
);
TrainingSchema.pre('findOne', function() {
  console.log('entered here');
  this.populate({ path: 'studentId' });
});
TrainingSchema.pre('find', function() {
  this.populate({ path: 'studentId' });
});

module.exports = mongoose.model('Trainings', TrainingSchema);
