const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const companySchema = new Schema({
    companyId: Number,
    companyName: String,
    companyDescription: String,
    companySelectionProcess: String,
    companyRecruited: Number,
    companySector: String
});
module.exports=mongoose.model('Company',companySchema);
