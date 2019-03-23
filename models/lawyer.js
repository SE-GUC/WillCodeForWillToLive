const mongoose = require('mongoose')

//define Lawyer model
var lawyerSchema = new mongoose.Schema({
    name: String,
    birth_date: Number,
    gender: String,
    nationality: String,
    type_Of_ID: String,
    mobile_number: String,
    fax_number: Number,
    email_address: String,
    username: String,
    password: String,
});

var Lawyer = module.exports = mongoose.model('Lawyer', lawyerSchema);
