const express = require('express');
var studentRouter = express.Router();
const Student = require('../models/Student');
const _ = require('lodash');

console.log('Execute');

const getStudent = (req, res) => {
  const studentId = req.params.studentId;
  Student.findOne({ studentId })
    .then(student => {
      if (!student) {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.studentId
        });
      }
      console.log(student);
      res.send(student);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.studentId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving student with id ' + req.params.studentId
      });
    });
};

const getAllStudents = (req, res) => {
  //console.log('Student List');
  Student.find()

    .then(studentData => {
      // console.log(studentData);
      res.send(studentData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving student data.'
      });
    });
};

const pick = body =>
  _.pick(body, [
    'studentName',
    'studentGender',
    'studentDob',
    'studentDept',
    'studentEmail',
    'studentContact',
    'studentTempAddress',
    'studentPermanentAddress',
    'studentBatch',
    'studentSSCMarks',
    'studentInterMarks',
    'studentDiplomaMarks',
    'studentBTechMarks',
    'studentResume',
    'studentPhoto'
  ]);

// Find note and update it with the request body
const updateStudent = (req, res) => {
  console.log('contl');
  console.log(Object.keys(req.body));

  console.log(pick);
  const studentId = req.params.studentId;
  Student.findOneAndUpdate({ studentId }, pick(req.body), { new: true })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.studentId
        });
      }
      res.send(id);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.studentId
        });
      }
      return res.status(500).send({
        message: 'Error updating student with id ' + req.params.studentId
      });
    });
};

const deleteStudent = (req, res) => {
  const studentId = req.params.studentId;
  Student.findOneAndRemove({ studentId })
    .then(id => {
      if (!id) {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.studentId
        });
      }
      res.send({ message: 'Student deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Student not found with id ' + req.params.studentId
        });
      }
      return res.status(500).send({
        message: 'Could not delete student with id ' + req.params.studentId
      });
    });
};

// Create a Note

const createStudent = async (req, res) => {
  try {
    console.log(req.body.studentDob);

    const student = new Student({
      studentId: req.body.studentId,
      studentName: req.body.studentName,
      studentEmail: req.body.studentEmail,
      studentContact: req.body.studentContact,
      studentGender: req.body.studentGender,
      studentDob: req.body.studentDob,
      studentDept: req.body.studentDept,
      studentTempAddress: req.body.studentTempAddress,
      studentPermanentAddress: req.body.studentPermanentAddress,
      //  studentCity: req.body.studentCity,
      //  studentState: req.body.studentState,
      //   studentPincode: req.body.studentPincode,
      studentBatch: req.body.studentBatch,
      studentSSCMarks: req.body.studentSSCMarks,
      studentInterMarks: req.body.studentInterMarks,
      studentDiplomaMarks: req.body.studentDiplomaMarks,
      studentBTechMarks: req.body.studentBTechMarks,
      studentResume: req.body.studentResume,
      studentPhoto: req.body.studentPhoto
    });

    // Save Note in the database
    const data = await student.save();
    // .then(data => {
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating the Student."
    //     });
    // });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Student.'
    });
  }
};

studentRouter.get('/all', getAllStudents);
studentRouter.get('/:studentId', getStudent);
studentRouter.post('/', createStudent);
studentRouter.patch('/:studentId', updateStudent);
studentRouter.delete('/:studentId', deleteStudent);

module.exports = studentRouter;
