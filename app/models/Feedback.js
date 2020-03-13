const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const studentFeedbackSchema = new Schema({
    studentId: {
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true
    },
    studentFeedback: {
        type:String
    }
    });

    module.exports=mongoose.model('Feedback',studentFeedbackSchema);
