const express=require("express");
var router = express.Router();

var studentRouter=require('./controllers/student');
var facultyRouter=require('./controllers/faculty');



router.use('/student',studentRouter);
router.use('/faculty',facultyRouter);

module.exports=router;