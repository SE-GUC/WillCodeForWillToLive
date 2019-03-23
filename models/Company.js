const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    companyNameEnglish: {
        type: String,
        required: false
    },
    companyNameArabic: {
        type: String,
        required: true,
        unique: true
    },
    establishmentDate: {
        type: Date,
        required: true
    },
    investorName: {
        type: String,
        required: true
    },
    companyStatus: {
        type: String,
        required: true
    }
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company