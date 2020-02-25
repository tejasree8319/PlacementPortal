const express=require("express");
var studentRouter = express.Router();
const Student = require('../models/student');
const _=require('lodash');

console.log("Execute");

const getStudent = (req,res)=>{
    Student.findById(req.params.studentId)
    .then(id => {
        if(!id) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });            
        }
        res.send(id)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.studentId
        });
    });
};

const getAllStudents=(req,res)=>{
        Student.find()
    .then( studentData=> {
        res.send(studentData);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving student data."
        });
    });
};


const pick=body=>_.pick(body,['qestudentName','studentGender','studentDob','studentDept']);
 

// Find note and update it with the request body
  const updateStudent=(req,res)=>{
    console.log(Object.keys(req.body))
    
    console.log(pick);
  Student.findByIdAndUpdate(req.params.studentId,
      pick(req.body),
      {new: true})
.then(id => {
    if(!id) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.studentId
        });
    }
    res.send(id);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.studentId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.studentId
    });
});
};

const deleteStudent = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(id => {
        if(!id) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });
        }
        res.send({message: "Data deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.studentId
        });
    });
};

// Create a Note

const createStudent = (req,res)=>{
    const student = new Student({
        studentId: req.body.studentId,
        studentName: req.body.studentName,
        studentEmail: req.body.studentEmail,
        studentContact: req.body.studentContact,
        studentGender: req.body.studentGender,
        studentDob: req.body.studentDob,
        studentDept: req.body.studentDept,
        studentAddress: req.body.studentAddress
    });
    
    // Save Note in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    
    res.send("Data");
};

studentRouter.get('/all',getAllStudents)
studentRouter.get('/:studentId',getStudent)
studentRouter.post('/',createStudent)
studentRouter.patch('/:studentId',updateStudent)
studentRouter.delete('/:studentId',deleteStudent)


module.exports = studentRouter;
