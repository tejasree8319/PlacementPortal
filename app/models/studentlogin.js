const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const studentLoginSchema = new Schema({
    studentId: String,
    studentPassword: String
});

module.exports=mongoose.model('StudentLogin',studentLoginSchema);
