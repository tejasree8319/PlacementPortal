const express=require("express");
var facultyRouter = express.Router();
const Faculty = require('../models/faculty');
const _=require('lodash');

console.log("Execute");

const getFaculty=(req,res)=>{
    res.send("Welcome");
};


// Create a Note

const createFaculty = async (req,res)=>{
    try{
         const faculty = new Faculty({
            facultyId: req.body.facultyId,
            facultyName: req.body.facultyName,
            facultyEmail: req.body.facultytEmail,
            facultyContact: req.body.facultyContact,
            facultyGender: req.body.facultyGender,
            facultyExperience: req.body.facultyExperience,
            facultyDept: req.body.facultyDept,
            facultyAddress: req.body.facultyAddress
            });
    
    // Save Note in the database
    const data = await faculty.save();
    // faculty.save()
    // .then(data => {
        res.send(data);
    }
    catch(err) {
  
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Faculty."
        });
    
}
};



facultyRouter.get('/',getFaculty)
facultyRouter.post('/',createFaculty)

module.exports = facultyRouter;


