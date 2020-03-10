const express=require("express");
var userRegisterRouter = express.Router();
const User = require('../models/userregistration');
const _=require('lodash');
console.log("Execute");


const createUser = async (req,res)=>{
    try{
    const user = new User({
        userId: req.body.userId,
        password: req.body.password,
        userType: req.body.userType
    });
    console.log("Username")

    const token = await user.generateAuthToken();
    res.send({ data: { user: user.removeUnwantedFields() }, token });

    const data = await user.save()
    res.send(data);
}
catch(err) {
  
        res.status(500).send({
            message: err.message || "Some error occurred while creating the UserRegistration."
        });
    
}
};

const pick=body=>_.pick(body,['password','userType']);

const updateUserDetails=(req,res)=>{
    console.log("contl");
  console.log(Object.keys(req.body))
  
  console.log(pick);
  const userId = req.params.userId;
User.findOneAndUpdate({userId},
    pick(req.body),
    {new: true}
    )
.then(id => {
  if(!id) {
      return res.status(404).send({
          message: "User not found with id " + req.params.userId
      });
  }
  res.send(id);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "User not found with id " + req.params.userId
      });                
  }
  return res.status(500).send({
      message: "Error updating user with id " + req.params.userId
  });
});
};



userLoginRouter.post('/',createUser)
userLoginRouter.patch('/:userId',updateUserDetails)


module.exports = userRegisterRouter;
