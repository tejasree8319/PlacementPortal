const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const facultyLoginSchema = new Schema({
    facultyId: String,
    facultyPassword: String
});

module.exports=mongoose.model('FacultyLogin',facultyLoginSchema);