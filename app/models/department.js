const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const deptSchema = new Schema({
    deptName: String
});

module.exports=mongoose.model('Department',deptSchema);

