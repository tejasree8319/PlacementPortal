const express = require('express');
var feedbackRouter = express.Router();
const StudentFeedback = require('../models/Feedback');
const _ = require('lodash');

console.log('Feedback');

const createStudentFeedback = async (req, res) => {
  try {
    console.log(req.body);
    const studentFeedback = new StudentFeedback({
      studentId: req.body.studentId,
      jobId: req.body.jobId,
      studentFeedback: req.body.studentFeedback
    });
    console.log(studentFeedback);

    const data = await studentFeedback.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the StudentFeedback.'
    });
  }
};

const getStudentFeedback = (req, res) => {
  const feedbackId = req.params.feedbackId;
  StudentFeedback.findOne({ _id: feedbackId })
    .then(student => {
      if (!student) {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.feedbackId
        });
      }
      res.send(student);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.feedbackId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving feedback with id ' + req.params.feedbackId
      });
    });
};

const getAllStudentsFeedback = (req, res) => {
  StudentFeedback.find()
    .then(studentData => {
      res.send(studentData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving student feedback.'
      });
    });
};

const pick = body => _.pick(body, ['studentFeedback', 'jobId']);

// Find note and update it with the request body
const updateStudentFeedback = (req, res) => {
  console.log('contl');
  console.log(Object.keys(req.body));

  console.log(pick);
  const feedbackId = req.params.feedbackId;
  StudentFeedback.findOneAndUpdate({ _id: feedbackId }, pick(req.body), {
    new: true
  })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.feedbackId
        });
      }
      res.send(id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.feedbackId
        });
      }
      return res.status(500).send({
        message:
          'Error updating studentfeedback with id ' + req.params.feedbackId
      });
    });
};

const deleteStudentFeedback = (req, res) => {
  const feedbackId = req.params.feedbackId;
  StudentFeedback.findOneAndRemove({ _id: feedbackId })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.feedbackId
        });
      }
      res.send({ message: 'StudentFeedback deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'StudentFeedback not found with id ' + req.params.feedbackId
        });
      }
      return res.status(500).send({
        message:
          'Could not delete studentfeedback with id ' + req.params.feedbackId
      });
    });
};

feedbackRouter.get('/all', getAllStudentsFeedback);
feedbackRouter.get('/:feedbackId', getStudentFeedback);
feedbackRouter.post('/', createStudentFeedback);
feedbackRouter.patch('/:feedbackId', updateStudentFeedback);
feedbackRouter.delete('/:feedbackId', deleteStudentFeedback);

module.exports = feedbackRouter;
