const express=require("express");
var studentLoginRouter = express.Router();
const Student = require('../models/studentlogin');
const _=require('lodash');

console.log("Execute");


const createStudentLogin = async (req,res)=>{
    try{
    const student = new Student({
        studentId: req.body.studentId,
        studentPassword: req.body.studentPassword
    });
    const data = await student.save()
    res.send(data);
}
catch(err) {
  
        res.status(500).send({
            message: err.message || "Some error occurred while creating the StudentLogin."
        });
    
}
};

const getStudentLogin = (req,res)=>{
    const studentId =req.params.studentId
    Student.findOne({studentId})
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

const pick=body=>_.pick(body,['studentPassword']);

const updateStudentLogin=(req,res)=>{
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



studentLoginRouter.get('/:studentId',getStudentLogin)
studentLoginRouter.post('/',createStudentLogin)
studentLoginRouter.patch('/:studentId',updateStudentLogin)


module.exports = studentLoginRouter;
