const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const feedbackSchema = new Schema({
    studentId: {
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true
    }
    });

    module.exports=mongoose.model('Feedback',feedbackSchema);
