const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const departmentSchema = new Schema({
    departmentName: String
});

module.exports=mongoose.model('Department',departmentSchema);

