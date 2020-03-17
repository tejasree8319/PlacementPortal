const express = require('express');
var placementsRouter = express.Router();
const Placements = require('../models/Placement');
const _ = require('lodash');

const createPlacement = async (req, res) => {
  try {
    const student = new Placements({
      studentId: req.body.studentId,
      jobId: req.body.jobId,
      appliedStatus: req.body.appliedStatus,
      selectedStatus: req.body.selectedStatus,
      eligibilityStatus: req.body.eligibilityStatus,
      academicYear: req.body.academicYear
    });

    const data = await student.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the Placements.'
    });
  }
};

const getPlacement = (req, res) => {
  const studentId = req.params.studentId;
  Placements.findOne({ studentId })
    .then(student => {
      if (!student) {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.studentId
        });
      }
      res.send(student);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.studentId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Placement with id ' + req.params.studentId
      });
    });
};

const getAllPlacements = (req, res) => {
  Placements.find()
    .then(studentData => {
      res.send(studentData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Placement data.'
      });
    });
};

const pick = body =>
  _.pick(body, [
    'jobId',
    'selectionStatus',
    'appliedStatus',
    'eligibilityStatus'
  ]);

const updatePlacement = (req, res) => {
  console.log('contl');
  console.log(Object.keys(req.body));

  console.log(pick);
  const studentId = req.params.studentId;
  Placements.findOneAndUpdate({ studentId }, pick(req.body), { new: true })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.studentId
        });
      }
      res.send(id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.studentId
        });
      }
      return res.status(500).send({
        message: 'Error updating Placement with id ' + req.params.studentId
      });
    });
};

const deletePlacement = (req, res) => {
  const studentId = req.params.studentId;
  Placements.findOneAndRemove({ studentId })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.studentId
        });
      }
      res.send({ message: 'Placement deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.studentId
        });
      }
      return res.status(500).send({
        message: 'Could not delete Placement with id ' + req.params.studentId
      });
    });
};

placementsRouter.get('/all', getAllPlacements);
placementsRouter.get('/:studentId', getPlacement);
placementsRouter.post('/', createPlacement);
placementsRouter.patch('/:studentId', updatePlacement);
placementsRouter.delete('/:studentId', deletePlacement);

module.exports = placementsRouter;
