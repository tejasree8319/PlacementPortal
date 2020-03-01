const express=require("express");
var router = express.Router();

var studentRouter=require('./controllers/student');
var facultyRouter=require('./controllers/faculty');
var departmentRouter=require('./controllers/department');



router.use('/student',studentRouter);
router.use('/faculty',facultyRouter);
router.use('/department',departmentRouter);

module.exports=router;