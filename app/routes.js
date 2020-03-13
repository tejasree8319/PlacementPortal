const express=require("express");
var router = express.Router();

var studentRouter=require('./controllers/student');
var facultyRouter=require('./controllers/faculty');
var departmentRouter=require('./controllers/department');
var jobRouter=require('./controllers/job');
var companyRouter=require('./controllers/company');
var userRegisterRouter=require('./controllers/userregistration');
var studentJobsRouter=require('./controllers/studentjobs');
var loginRouter=require('./controllers/userlogin');
var feedbackRouter=require('./controllers/feedback');
var trainingRouter=require('./controllers/studenttraining');

router.use('/student',studentRouter);
router.use('/faculty',facultyRouter);
router.use('/department',departmentRouter);
router.use('/job',jobRouter);
router.use('/company',companyRouter);
router.use('/userregistration',userRegisterRouter);
router.use('/studentjobs',studentJobsRouter);
router.use('/userlogin',loginRouter);
router.use('/feedback',feedbackRouter);
router.use('/studenttraining',trainingRouter);

module.exports=router;