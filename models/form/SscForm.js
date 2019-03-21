const mongoose = require('mongoose');
const Schema = mongoose.Schema


const FormSchema = new Schema({
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
        required: true,
        unique: true

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
        min:50000
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
    boardOfDirectorsName: {
        type: [String],
        required: true
    },
    boardOfDirectorsId: {
        type: [Number],
        required: true
    },
    boardOfDirectorsGender: {
        type: [String],
        required: true
    },
    boardOfDirectorsNationality: {
        type: [String],
        required: true
    },
    boardOfDirectorsBirthDate: {
        type: [Date],
        required: true
    },
    boardOfDirectorsPosition: {
        type: [String],
        required: true
    },
    boardOfDirectorsHomeAddress: {
        type: [String],
        required: true
    },
    Reviewed: {
        type: Boolean,
        required: true
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

module.exports = SscForm = mongoose.model('SscForm', SscFormSchema)