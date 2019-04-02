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
        type: Date,
        required: true
    },  
    InvestorName: {
        type: String,
        required: true
    },
    CapitalCurrency: {
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
    hqInfo: {
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
    },
})

module.exports = mongoose.model('Company', CompanySchema)
