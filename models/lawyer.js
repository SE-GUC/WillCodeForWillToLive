const mongoose = require('mongoose')

//define Lawyer model
var lawyerSchema = new mongoose.Schema({
    name: String,
    birth_date: String,
    gender: String,
    nationality: String,
    ID: String,
    typeOfID: String,
    mobile_number: String,
    fax_number: Number,
    email_address: String,
    username: { type: String, required: true, unique: true },
    password: String
});

var Lawyer = module.exports = mongoose.model('Lawyer', lawyerSchema);
