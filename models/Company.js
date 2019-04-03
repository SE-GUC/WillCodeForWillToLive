const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    CompanyName: {
        type: String,
    },
    CompanyType: {
        type: String,
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
     type: String
    },
    Fax: {
     type: String
    }
})

const Company = mongoose.model('Company', CompanySchema)