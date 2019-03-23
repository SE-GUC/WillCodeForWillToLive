const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SpcFormSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true

    },
    CompanyName: {
        type: String,
        required: true,
        unique: true

    },
    CompanyNationality: {
        type: [String],
        required: true

    },
    CompanyName_English: {
        type: String,
        required: false
    },
    Currency: {
        type: [String],
        required: true
    },
    Capital: {
        type: Number,
        required: true
    },
    CreatedAt: {
        type: Date,
        required: true,
        default:Date.now
    },
    RegulatedLaw: {
        type: [String],
        required: true
    },
    FormOfLegalCompany: {
        type: [String],
        required: true
    },
    Governorate: {
        type: [String],
        required: true
    },
    City: {
        type: [String],
        required: true
    },
    Address: {
        type: [String],
        required: true
    },
    Reviewed: {
        type: Boolean,
        required: true
    },
    ReviewedComment: {
        type: String,
        required: false
    },
    ReviewedDate: {
        type: Date,
        required: false
    },
    Status: {
        type: Boolean,
        required: true
    },
    Fax: {
        type: String,
        required: true
    },
    LawyerName: {
        type: String,
        required: true
    },

    InvestorName: {
        type: [String],
        required: true
    },
    InvestorGender: {
        type: [String],
        required: true
    },
    InvestorNationality: {
        type: [String],
        required: true
    },
    InvestorId: {
        type: [Number],
        required: true,
        unique: true
    },
    InvestorBirthdate: {
        type: [Date],
        required: true
    },
    InvestorTelephone: {
        type: [Number],
        required: true
    },
    InvestorFax: {
     type: [String],
     required: true
    },
    InvestorEmail: {
        type: [String],
        required: true
    },
    InvestorHomeAddress: {
        type: [String],
        required: true
    },
  
})

module.exports = SpcForm = mongoose.model('SpcForm', SpcFormSchema)