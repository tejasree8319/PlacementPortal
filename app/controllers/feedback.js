const express = require('express');
var feedbackRouter = express.Router();
const StudentFeedback = require('../models/Feedback');
const _ = require('lodash');

console.log('Feedback');

const createStudentFeedback = async (req, res) => {
  try {
    const studentFeedback = new StudentFeedback({
      studentId: req.body.studentId,
      jobId: req.body.jobId,
      studentFeedback: req.body.studentFeedback
    });

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
  const studentId = req.params.objectId;
  StudentFeedback.findOne({ studentId })
    .then(student => {
      if (!student) {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.objectId
        });
      }
      res.send(student);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.objectId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving feedback with id ' + req.params.objectId
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
  const studentId = req.params.objectId;
  StudentFeedback.findOneAndUpdate({ studentId }, pick(req.body), { new: true })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.objectId
        });
      }
      res.send(id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.objectId
        });
      }
      return res.status(500).send({
        message: 'Error updating studentfeedback with id ' + req.params.objectId
      });
    });
};

const deleteStudentFeedback = (req, res) => {
  const studentId = req.params.objectId;
  StudentFeedback.findOneAndRemove({ studentId })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Feedback not found with id ' + req.params.objectId
        });
      }
      res.send({ message: 'StudentFeedback deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'StudentFeedback not found with id ' + req.params.objectId
        });
      }
      return res.status(500).send({
        message:
          'Could not delete studentfeedback with id ' + req.params.objectId
      });
    });
};

feedbackRouter.get('/all', getAllStudentsFeedback);
feedbackRouter.get('/:objectId', getStudentFeedback);
feedbackRouter.post('/', createStudentFeedback);
feedbackRouter.patch('/:objectId', updateStudentFeedback);
feedbackRouter.delete('/:objectId', deleteStudentFeedback);

module.exports = feedbackRouter;
