const express = require('express');
var departmentRouter = express.Router();
const Department = require('../models/Department');

const getAllDepartments = (req, res) => {
  Department.find()
    .then(departmentData => {
      res.send(departmentData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving department data.'
      });
    });
};

const createDepartment = async (req, res) => {
  try {
    const department = new Department({
      departmentName: req.body.departmentName
    });

    // Save Note in the database
    const data = await department.save();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the department.'
    });
  }
};

departmentRouter.get('/all', getAllDepartments);
departmentRouter.post('/', createDepartment);

module.exports = departmentRouter;
