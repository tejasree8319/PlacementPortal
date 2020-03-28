const express = require('express');
var placementsRouter = express.Router();
const Placements = require('../models/Placement');
const _ = require('lodash');

const createPlacement = async (req, res) => {
  try {
    const student = new Placements({
      studentId: req.body.studentId,
      companyId: req.body.companyId,
      jobId: req.body.jobId,
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
  const placementId = req.params.placementId;
  Placements.findOne({ _id: placementId })
    .then(student => {
      if (!student) {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.placementId
        });
      }
      res.send(student);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.placementId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving Placement with id ' + req.params.placementId
      });
    });
};

const getAllPlacements = (req, res) => {
  const academicYear = req.params.academicYear;

  Placements.find({ academicYear })
    .then(studentData => {
      console.log(studentData);
      res.send(studentData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Placement data.'
      });
    });
};

const pick = body => _.pick(body, ['jobId', 'companyId', 'academicYear']);

const updatePlacement = (req, res) => {
  // console.log('contl');
  // console.log(req.params.studentId);

  // console.log(pick);
  const placementId = req.params.placementId;
  Placements.findOneAndUpdate({ _id: placementId }, pick(req.body), {
    new: true
  })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.placementId
        });
      }
      res.send(id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.placementId
        });
      }
      return res.status(500).send({
        message: 'Error updating Placement with id ' + req.params.placementId
      });
    });
};

const deletePlacement = (req, res) => {
  const placementId = req.params.placementId;
  Placements.findOneAndRemove({ _id: placementId })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.placementId
        });
      }
      res.send({ message: 'Placement deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Placement not found with id ' + req.params.placementId
        });
      }
      return res.status(500).send({
        message: 'Could not delete Placement with id ' + req.params.placementId
      });
    });
};

placementsRouter.get('/all/:academicYear', getAllPlacements);
placementsRouter.get('/:placementId', getPlacement);
placementsRouter.post('/', createPlacement);
placementsRouter.patch('/:placementId', updatePlacement);
placementsRouter.delete('/:placementId', deletePlacement);

module.exports = placementsRouter;
