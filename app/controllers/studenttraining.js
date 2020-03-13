const express=require("express");
var trainingRouter = express.Router();
const StudentTraining = require('../models/studenttraining');
const _=require('lodash');

console.log("Trainings");

const createStudentTraining = async (req,res)=>{
    try{
    const student = new StudentTraining({
        studentId: req.body.studentId,
        trainingType: req.body.trainingType
    });

    const data = await student.save()

    res.send(data);
}
catch(err) {
  
        res.status(500).send({
            message: err.message || "Some error occurred while creating the StudentTraining."
        });
    
}
};

const getStudentTraining = (req,res)=>{
    const studentId =req.params.studentId
    StudentTraining.findOne({studentId})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });            
        }
        res.send(student)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.studentId
        });
    });
};

const getAllStudentsTraining=(req,res)=>{
    StudentTraining.find()
.then( studentData=> {
    res.send(studentData);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving student training data."
    });
});
};

const pick=body=>_.pick(body,['studentId','trainingType']);
 
const updateStudentTraining=(req,res)=>{
    console.log("contl");
  console.log(Object.keys(req.body))
  
  console.log(pick);
  const studentId = req.params.studentId;
StudentTraining.findOneAndUpdate({studentId},
    pick(req.body),
    {new: true}
    )
.then(id => {
  if(!id) {
      return res.status(404).send({
          message: "Student not found with id " + req.params.studentId
      });
  }
  res.send(id);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Student not found with id " + req.params.studentId
      });                
  }
  return res.status(500).send({
      message: "Error updating student with id " + req.params.studentId
  });
});
};

const deleteStudentTraining = (req, res) => {
    const studentId = req.params.studentId;
    StudentTraining.findOneAndRemove({studentId})
    .then(id => {
        if(!id) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
};


trainingRouter.get('/all',getAllStudentsTraining)
trainingRouter.get('/:studentId',getStudentTraining)
trainingRouter.post('/',createStudentTraining)
trainingRouter.patch('/:studentId',updateStudentTraining)
trainingRouter.delete('/:studentId',deleteStudentTraining)


module.exports = trainingRouter;    