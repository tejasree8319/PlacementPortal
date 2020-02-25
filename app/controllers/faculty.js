const express=require("express");
var facultyRouter = express.Router();
const Faculty = require('../models/faculty');
const _=require('lodash');

console.log("Execute");

const getFaculty=(req,res)=>{
    res.send("Welcome");
};


// Create a Note

const createFaculty = (req,res)=>{
    const faculty = new Student({
        facultyId: req.body.studentId,
        facultyName: req.body.studentName,
        facultyEmail: req.body.studentEmail,
        facultyContact: req.body.studentContact,
        facultyGender: req.body.studentGender,
        facultyExperience: req.body.studentDob,
        facultyDept: req.body.studentDept,
        facultyAddress: req.body.studentAddress
    });
    
    // Save Note in the database
    faculty.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    
    res.send("Data");
};



facultyRouter.get('/',getFaculty)
facultyRouter.post('/',createFaculty)

module.exports = facultyRouter;


