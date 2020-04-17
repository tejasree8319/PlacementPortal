const express = require('express');
var registerRouter = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const _ = require('lodash');

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.body.userId;
    const userType = req.body.userType;
    const user = new User({
      userId: req.body.userId,
      password: req.body.password,
      userType: req.body.userType,
    });

    const data = await user.save();
    const token = await user.generateAuthToken();

    if (userType == 'student') {
      const student = new Student({
        studentId: userId,
      });
      const id = await student.save();
    } else {
      const faculty = new Faculty({
        facultyId: userId,
      });
      const id = await faculty.save();
    }
    console.log(data);
    var _id = data._id;
    res.send({ _id, userId, userType, token });
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while creating the UserRegistration.',
    });
  }
};

const pick = (body) => _.pick(body, ['password']);

const updateUserDetails = async (req, res) => {
  console.log('contl');
  console.log(Object.keys(req.body));

  console.log(pick);
  const userId = req.params.userId;
  User.findOneAndUpdate({ userId }, pick(req.body), { new: true })
    .then((id) => {
      if (!id) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId,
        });
      }
      const token = id.generateAuthToken();
      // res.send({ data: { user: id.removeUnwantedFields() }, token });
      res.send('Updated successfully');
      //res.send(id);
    })

    .catch((err) => {
      console.log(err);

      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId,
        });
      }
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.userId,
      });
    });
};

registerRouter.post('/', createUser);
registerRouter.patch('/:userId', updateUserDetails);

module.exports = registerRouter;
