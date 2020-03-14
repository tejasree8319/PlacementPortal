const express = require('express');
var router = express.Router();

var studentRouter = require('./controllers/student');
var facultyRouter = require('./controllers/faculty');
var departmentRouter = require('./controllers/department');
var jobRouter = require('./controllers/job');
var companyRouter = require('./controllers/company');
var registerRouter = require('./controllers/register');
var placementRouter = require('./controllers/placement');
var loginRouter = require('./controllers/login');
var feedbackRouter = require('./controllers/feedback');
var trainingRouter = require('./controllers/trainings');

router.use('/student', studentRouter);
router.use('/faculty', facultyRouter);
router.use('/department', departmentRouter);
router.use('/job', jobRouter);
router.use('/company', companyRouter);
router.use('/register', registerRouter);
router.use('/placement', placementRouter);
router.use('/login', loginRouter);
router.use('/feedback', feedbackRouter);
router.use('/trainings', trainingRouter);

module.exports = router;
