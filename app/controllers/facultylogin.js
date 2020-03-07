const express=require("express");
var facultyLoginRouter = express.Router();
const Faculty = require('../models/facultylogin');
const _=require('lodash');

console.log("Execute");

const createFacultyLogin = async (req,res)=>{
    try{
    const faculty = new Faculty({
        facultyId: req.body.facultyId,
        facultyPassword: req.body.facultyPassword
    });
    const data = await faculty.save()
    res.send(data);
}
catch(err) {
  
        res.status(500).send({
            message: err.message || "Some error occurred while creating the FacultyLogin."
        });
    
}
};

const getFacultyLogin = (req,res)=>{
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

const pick=body=>_.pick(body,['facultyPassword']);

const updateFacultyLogin=(req,res)=>{
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



facultyLoginRouter.get('/:facultyId',getFacultyLogin)
facultyLoginRouter.post('/',createFacultyLogin)
facultyLoginRouter.patch('/:facultyId',updateFacultyLogin)


module.exports = facultyLoginRouter;
