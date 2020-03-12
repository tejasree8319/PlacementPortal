const express=require("express");
var facultyRouter = express.Router();
const Faculty = require('../models/faculty');
const _=require('lodash');

console.log("Execute");

const getFaculty=(req,res)=>{
    const facultyId =req.params.facultyId
    Faculty.findOne({facultyId})
    .then(faculty => {
        if(!faculty) {
            return res.status(404).send({
                message: "Faculty not found with id " + req.params.facultyId
            });            
        }
        res.send(faculty)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Faculty not found with id " + req.params.facultyId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving faculty with id " + req.params.facultyId
        });
    });
};

const getAllFaculty=(req,res)=>{
    Faculty.find()
.then( facultyData=> {
    res.send(facultyData);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving faculty data."
    });
});
};

const pick=body=>_.pick(body,['facultyName','facultyGender','facultyExperience','facultyDept','facultyEmail','facultyContact','facultyDesignation']);

// Find note and update it with the request body
const updateFaculty=(req,res)=>{
    console.log("contl");
  console.log(Object.keys(req.body))
  
  console.log(pick);
  const facultyId = req.params.facultyId;
Faculty.findOneAndUpdate({facultyId},
    pick(req.body),
    {new: true}
    )
.then(id => {
  if(!id) {
      return res.status(404).send({
          message: "Faculty not found with id " + req.params.facultyId
      });
  }
  res.send(id);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Faculty not found with id " + req.params.facultyId
      });                
  }
  return res.status(500).send({
      message: "Error updating faculty with id " + req.params.facultyId
  });
});
};

const deleteFaculty = (req, res) => {
    const facultyId = req.params.facultyId;
    Faculty.findOneAndRemove({facultyId})
    .then(id => {
        if(!id) {
            return res.status(404).send({
                message: "Faculty not found with id " + req.params.facultyId
            });
        }
        res.send({message: "Faculty deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Faculty not found with id " + req.params.facultyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete faculty with id " + req.params.facultyId
        });
    });
};

// Create a Note

const createFaculty = async (req,res)=>{
    try{
         const faculty = new Faculty({
            facultyId: req.body.facultyId,
            facultyName: req.body.facultyName,
            facultyEmail: req.body.facultyEmail,
            facultyContact: req.body.facultyContact,
            facultyGender: req.body.facultyGender,
            facultyDesignation: req.body.facultyDesignation,
            facultyExperience: req.body.facultyExperience,
            facultyDept: req.body.facultyDept,
            facultyQualification: req.body.facultyQualification,
           // facultyAddress: req.body.facultyAddress
            facultyPhoto: req.body.facultyPhoto,
            facultyResume: req.body.facultyResume 
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



facultyRouter.get('/all',getAllFaculty)
facultyRouter.get('/:facultyId',getFaculty)
facultyRouter.post('/',createFaculty)
facultyRouter.patch('/:facultyId',updateFaculty)
facultyRouter.delete('/:facultyId',deleteFaculty)

module.exports = facultyRouter;


