//const _ = require('lodash');
//const Tenant = require('../models/Tenant/Configuration');
const express=require("express");
const User = require('../models/User');
const loginRouter = express.Router();

console.log("Execute");

/**
 * User Login
 */
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const userDetails = await User.findByCredentials(userId, password);
    //const tenantConfig = await Tenant.find({ _id: userDetails.tenant }, { _id: 0, name: 1, contact: 1, tLogo: 1 });
    const token = await userDetails.generateAuthToken();
    res.send({ data: { user: userId, userType, token } });
  } catch (err) {
    res.status(400).send(JSON.stringify(err, ['stack'], 4));
  }
};

//const pick = userDetails => _.pick(userDetails, ['username', 'userPhoto']);
loginRouter.post('/', login);


module.exports = loginRouter;
