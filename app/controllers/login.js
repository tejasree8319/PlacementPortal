//const _ = require('lodash');
//const Tenant = require('../models/Tenant/Configuration');
const express = require('express');
const User = require('../models/User');
const loginRouter = express.Router();

console.log('Execute');

/**
 * User Login
 */
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const userDetails = await User.findByCredentials(userId, password);
    const { userType } = userDetails;
    const token = await userDetails.generateAuthToken();
    res.send({ user: userId, userType, token });
  } catch (err) {
    res.status(400).send(JSON.stringify(err, ['stack'], 4));
  }
};

loginRouter.post('/', login);

module.exports = loginRouter;
