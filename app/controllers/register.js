const express = require('express');
var registerRouter = express.Router();
const User = require('../models/User');
const _ = require('lodash');
console.log('Execute');

const createUser = async (req, res) => {
  try {
    const user = new User({
      userId: req.body.userId,
      password: req.body.password,
      userType: req.body.userType
    });
    console.log('Username');

    const data = await user.save();
    console.log(user);
    const token = await user.generateAuthToken();
    res.send({ data: { user: user.removeUnwantedFields() }, token });
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while creating the UserRegistration.'
    });
  }
};

const pick = body => _.pick(body, ['password', 'userType']);

const updateUserDetails = async (req, res) => {
  console.log('contl');
  console.log(Object.keys(req.body));

  console.log(pick);
  const userId = req.params.userId;
  User.findOneAndUpdate({ userId }, pick(req.body), { new: true })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      const token = id.generateAuthToken();

      res.send({ data: { user: id.removeUnwantedFields() }, token });
      //res.send(id);
    })

    .catch(err => {
      console.log(err);

      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.userId
      });
    });
};

registerRouter.post('/', createUser);
registerRouter.patch('/:userId', updateUserDetails);

module.exports = registerRouter;
