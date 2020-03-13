const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentTrainingSchema=new Schema({
    studentId:{
        type:String
    },
    trainingType:{
        type:String
    }
})

module.exports=mongoose.model('StudentTrainings',studentTrainingSchema);
