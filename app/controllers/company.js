const express = require('express');
var companyRouter = express.Router();
const Company = require('../models/Company');
const _ = require('lodash');

console.log('Execute');

const createCompany = async (req, res) => {
  try {
    const company = new Company({
      companyName: req.body.companyName,
      companyLogo: req.body.companyLogo,
      companyDescription: req.body.companyDescription,
      companySector: req.body.companySector,
      companyMaterial: req.body.companyMaterial,
    });

    const data = await company.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Company.',
    });
  }
};

const getCompany = (req, res) => {
  const companyId = req.params.companyId;
  Company.findOne({ _id: companyId })
    .then((company) => {
      if (!company) {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId,
        });
      }
      res.send(company);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving company with id ' + req.params.companyId,
      });
    });
};

const getAllCompanies = (req, res) => {
  Company.find()
    .then((companyData) => {
      res.send(companyData);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving company data.',
      });
    });
};

const pick = (body) =>
  _.pick(body, [
    'companyName',
    'companyLogo',
    'companyDescription',
    'companySector',
    'companyMaterial',
  ]);

// Find note and update it with the request body
const updateCompany = (req, res) => {
  console.log(req.body);
  const companyId = req.params.companyId;
  Company.findOneAndUpdate({ _id: companyId }, pick(req.body), { new: true })
    .then((id) => {
      if (!id) {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId,
        });
      }
      console.log(id);
      res.send(id);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId,
        });
      }
      return res.status(500).send({
        message: 'Error updating company with id ' + req.params.companyId,
      });
    });
};

const deleteCompany = (req, res) => {
  const companyId = req.params.companyId;
  Company.findOneAndRemove({ _id: companyId })
    .then((id) => {
      if (!id) {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId,
        });
      }
      res.send({ message: 'Company deleted successfully!' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Company not found with id ' + req.params.companyId,
        });
      }
      return res.status(500).send({
        message: 'Could not delete company with id ' + req.params.companyId,
      });
    });
};

companyRouter.get('/all', getAllCompanies);
companyRouter.get('/:companyId', getCompany);
companyRouter.post('/', createCompany);
companyRouter.patch('/:companyId', updateCompany);
companyRouter.delete('/:companyId', deleteCompany);

module.exports = companyRouter;
