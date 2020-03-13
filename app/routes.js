const express=require("express");
var router = express.Router();

var studentRouter=require('./controllers/student');
var facultyRouter=require('./controllers/faculty');
var departmentRouter=require('./controllers/department');
var jobRouter=require('./controllers/job');
var companyRouter=require('./controllers/company');
var registerRouter=require('./controllers/register');
var studentJobsRouter=require('./controllers/studentjobs');
var loginRouter=require('./controllers/login');
var feedbackRouter=require('./controllers/feedback');
var trainingRouter=require('./controllers/trainings');

router.use('/student',studentRouter);
router.use('/faculty',facultyRouter);
router.use('/department',departmentRouter);
router.use('/job',jobRouter);
router.use('/company',companyRouter);
router.use('/userregistration',registerRouter);
router.use('/studentjobs',studentJobsRouter);
router.use('/userlogin',loginRouter);
router.use('/feedback',feedbackRouter);
router.use('/trainings',trainingRouter);

module.exports=router;