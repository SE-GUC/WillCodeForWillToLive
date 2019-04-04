const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    CompanyName: {
        type: String,
        required: true
    },
    CompanyType: {
        type: String,
        required: true
    },
    EstablishmentDate: {
        type: String,
        required: true
    },  
    InvestorName: {
        type: String,
        required: true
    },
    InvestorId: {
        type: String,
        required: true
    },
    Capital: {
        type: Number,
        required: true
    },
    RegulatingLaw: {
        type: String,
        required: true
    },
    CompanyLegalForm: {
        type: String,
        required: true
    },
    Governorate: {
       type: String,
       required: true
     },
    City: {
       type: String,
       required: true
    },
    Address: {
     type: String,
     required: true
    },
    Telephone: {
     type: String,
     required: true
    },
    Fax: {
     type: String,
     required: true
    }
})

const Company = mongoose.model('Company', CompanySchema)