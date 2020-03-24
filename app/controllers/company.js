const express = require('express');
var companyRouter = express.Router();
const Company = require('../models/Company');
const _ = require('lodash');

console.log('Execute');

const createCompany = async (req, res) => {
  try {
    const company = new Company({
      companyId: req.body.companyId,
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      // companySelectionProcess: req.body.companySelectionProcess,
      // //companyRecruited: req.body.companyRecruited,
      companySector: req.body.companySector
    });

    const data = await company.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Company.'
    });
  }
};

const getCompany = (req, res) => {
  const companyId = req.params.companyId;
  Company.findOne({ companyId })
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId
        });
      }
      res.send(company);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving company with id ' + req.params.companyId
      });
    });
};

const getAllCompanies = (req, res) => {
  Company.find()
    .then(companyData => {
      res.send(companyData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving company data.'
      });
    });
};

const pick = body =>
  _.pick(body, [
    'companyName',
    'companyDescription',
    'companySelectionProcess',
    'companyRecruited'
  ]);

// Find note and update it with the request body
const updateCompany = (req, res) => {
  console.log('contl');
  console.log(Object.keys(req.body));

  console.log(pick);
  const companyId = req.params.companyId;
  Company.findOneAndUpdate({ companyId }, pick(req.body), { new: true })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId
        });
      }
      res.send(id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId
        });
      }
      return res.status(500).send({
        message: 'Error updating company with id ' + req.params.companyId
      });
    });
};

const deleteCompany = (req, res) => {
  const companyId = req.params.companyId;
  Company.findOneAndRemove({ companyId })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId
        });
      }
      res.send({ message: 'Company deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId
        });
      }
      return res.status(500).send({
        message: 'Could not delete company with id ' + req.params.companyId
      });
    });
};

companyRouter.get('/all', getAllCompanies);
companyRouter.get('/:companyId', getCompany);
companyRouter.post('/', createCompany);
companyRouter.patch('/:companyId', updateCompany);
companyRouter.delete('/:companyId', deleteCompany);

module.exports = companyRouter;
