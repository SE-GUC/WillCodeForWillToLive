const mongoose = require('mongoose')

//define Lawyer model
var lawyerSchema = new mongoose.Schema({
    name: String,
    birth_date: String,
    gender: String,
    nationality: String,
    typeOfID: String,
    mobile_number: String,
    fax_number: Number,
    email_address: String,
    username: String,
    password: String
});

var Lawyer = module.exports = mongoose.model('Lawyer', lawyerSchema);
