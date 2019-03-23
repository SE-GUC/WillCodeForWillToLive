const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SpcFormSchema = new Schema({
<<<<<<< HEAD
    id: {
        type: Number,
        required: true,
        unique: true

    },
=======

>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
    CompanyName: {
        type: String,
        required: true,
        unique: true

    },
    CompanyNationality: {
<<<<<<< HEAD
        type: [String],
        required: true
=======
        type: String,
        required: true,
        unique: true
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe

    },
    CompanyName_English: {
        type: String,
        required: false
    },
    Currency: {
<<<<<<< HEAD
        type: [String],
=======
        type: String,
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
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
<<<<<<< HEAD
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
=======
        type: String,
        required: true
    },
    FormOfLegalCompany: {
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
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
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
<<<<<<< HEAD
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
=======
        type: String,
        required: true
    },
    InvestorGender: {
        type: String,
        required: true
    },
    InvestorNationality: {
        type: String,
        required: true
    },
    InvestorId: {
        type: Number,
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
        required: true,
        unique: true
    },
    InvestorBirthdate: {
<<<<<<< HEAD
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
=======
        type: Date,
        required: true
    },
    InvestorTelephone: {
        type: Number,
        required: true
    },
    InvestorFax: {
     type: String,
     required: true
    },
    InvestorEmail: {
        type: String,
        required: true
    },
    InvestorHomeAddress: {
        type: String,
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
        required: true
    },
  
})

module.exports = SpcForm = mongoose.model('SpcForm', SpcFormSchema)