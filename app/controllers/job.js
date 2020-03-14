const express = require('express');
var jobRouter = express.Router();
const Job = require('../models/Job');
const _ = require('lodash');

console.log('Execute');

const createJob = async (req, res) => {
  try {
    const job = new Job({
      jobId: req.body.jobId,
      jobProfile: req.body.jobProfile,
      jobSkills: req.body.jobSkills,
      jobDescription: req.body.jobDescription,
      jobEligibility: req.body.jobEligibility,
      jobPackage: req.body.jobPackage,
      jobLocation: req.body.jobLocation,
      jobDate: req.body.jobDate,
      jobDept: req.body.jobDept,
      jobType: req.body.jobType
    });

    const data = await job.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Job.'
    });
  }
};

const getJob = (req, res) => {
  const jobId = req.params.jobId;
  Job.findOne({ jobId })
    .then(job => {
      if (!job) {
        return res.status(404).send({
          message: 'Job not found with id ' + req.params.jobId
        });
      }
      res.send(job);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Job not found with id ' + req.params.jobId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving job with id ' + req.params.jobId
      });
    });
};

const getAllJobs = (req, res) => {
  Job.find()
    .then(jobData => {
      res.send(jobData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving job data.'
      });
    });
};

const pick = body =>
  _.pick(body, [
    'jobProfile',
    'jobSkills',
    'jobDescription',
    'jobEligibility',
    'jobPackage',
    'jobLocation',
    'jobDate',
    'jobDept',
    'jobType'
  ]);

// Find note and update it with the request body
const updateJob = (req, res) => {
  console.log('contl');
  console.log(Object.keys(req.body));

  console.log(pick);
  const jobId = req.params.jobId;
  Job.findOneAndUpdate({ jobId }, pick(req.body), { new: true })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Job not found with id ' + req.params.jobId
        });
      }
      res.send(id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Job not found with id ' + req.params.jobId
        });
      }
      return res.status(500).send({
        message: 'Error updating job with id ' + req.params.jobId
      });
    });
};

const deleteJob = (req, res) => {
  const jobId = req.params.jobId;
  Job.findOneAndRemove({ jobId })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Job not found with id ' + req.params.jobId
        });
      }
      res.send({ message: 'JobId deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Job not found with id ' + req.params.jobId
        });
      }
      return res.status(500).send({
        message: 'Could not delete job with id ' + req.params.jobId
      });
    });
};

jobRouter.get('/all', getAllJobs);
jobRouter.get('/:jobId', getJob);
jobRouter.post('/', createJob);
jobRouter.patch('/:jobId', updateJob);
jobRouter.delete('/:jobId', deleteJob);

module.exports = jobRouter;
