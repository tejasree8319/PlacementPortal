const express = require('express');
var nodemailer = require('nodemailer');
var emailRouter = express.Router();

const sendEmail = async (req, res) => {
  try {
    const { emailto, emailsubject, emailtext } = req.body;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tejasree8319@gmail.com',
        pass: 'familychinna',
      },
    });

    var mailOptions = {
      from: 'tejasree8319@gmail.com',
      to: emailto,
      subject: emailsubject,
      text: emailtext,
    };
    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send(req.body);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while sending the Email.',
    });
  }
};

emailRouter.post('/', sendEmail);

module.exports = emailRouter;
