const express=require("express");
var studentJobsRouter = express.Router();
const StudentJobs = require('../models/Studentjobs');
const _=require('lodash');

const createStudentJobs = async (req,res)=>{
    try{
    const student = new StudentJobs({
        studentId: req.body.studentId,
        jobId: req.body.jobId,
        appliedStatus: req.body.appliedStatus,
        selectedStatus: req.body.selectedStatus,
        eligibilityStatus: req.body.eligibilityStatus,
        academicYear: req.body.academicYear
    });

    const data = await student.save()
    res.send(data);
}
catch(err) {
  
        res.status(500).send({
            message: err.message || "Some error occurred while creating the StudentJobs."
        });
    
}
};

const getStudentJobs = (req,res)=>{
    const studentId =req.params.studentId
    Student.findOne({studentId})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "StudentJob not found with id " + req.params.studentId
            });            
        }
        res.send(student)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "StudentJob not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving studentjob with id " + req.params.studentId
        });
    });
};


const getAllStudentJobs=(req,res)=>{
    Student.find()
.then( studentData=> {
    res.send(studentData);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving studentjob data."
    });
});
};


const pick=body=>_.pick(body,['jobId','selectionStatus','appliedStatus','eligibilityStatus']);

const updateStudentJob=(req,res)=>{
    console.log("contl");
  console.log(Object.keys(req.body))
  
  console.log(pick);
  const studentId = req.params.studentId;
Student.findOneAndUpdate({studentId},
    pick(req.body),
    {new: true}
    )
.then(id => {
  if(!id) {
      return res.status(404).send({
          message: "Studentjob not found with id " + req.params.studentId
      });
  }
  res.send(id);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Studentjob not found with id " + req.params.studentId
      });                
  }
  return res.status(500).send({
      message: "Error updating studentjob with id " + req.params.studentId
  });
});
};

const deleteStudentJob = (req, res) => {
    const studentId = req.params.studentId;
    Student.findOneAndRemove({studentId})
    .then(id => {
        if(!id) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Studentjob deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Studentjob not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete studentjob with id " + req.params.studentId
        });
    });
};

studentJobsRouter.get('/all',getAllStudentJobs)
studentJobsRouter.get('/:studentId',getStudentJobs)
studentJobsRouter.post('/',createStudentJobs)
studentJobsRouter.patch('/:studentId',updateStudentJob)
studentJobsRouter.delete('/:studentId',deleteStudentJob)


module.exports = studentJobsRouter;


