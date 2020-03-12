const express=require("express");
var feedbackRouter = express.Router();
const StudentFeedback = require('../models/feedback');

const createStudentFeedback = async (req,res)=>{
    try{
    const studentFeedback = new Student({
        studentId: req.body.studentId,
        jobId:req.body.jobId
    });
    
    const data = await studentFeedback.save()
    res.send(data);
}
catch(err) {
  
        res.status(500).send({
            message: err.message || "Some error occurred while creating the StudentFeedback."
        });
    
}
};

