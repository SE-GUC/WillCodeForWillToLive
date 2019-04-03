const mongoose = require('mongoose')

const schema = {
  regulatingLaw: {type: String, required: true},
  companyType: {type: String, required: true},
  companyNameArabic: {type: String, required: true},
  companyNameEnglish: {type: String, required: true},
  hqGovernorate: {type: String, required: true},
  hqCity: {type: String, required: true},
  hqTelephone: String,
  hqFax: String,
  capitalCurrency: {type: String, required: true},
  capital: {type: Number, required: true},
  investorName: {type: String, required: true},
  investorType: {type: String, required: true},
  investorGender: String,
  investorNationality: {type: String, required: true},
  investorIdType: {type: String},
  investorId: {type: String},
  investorBirthdate: {type: Date},
  investorTelephone: String,
  investorFax: String,
  investorEmail: String,
  investorAddress: {type: String, required: true},
  boardOfDirectors: [{
    directorName: {type: String, required: true},
    directorType: {type: String, required: true},
    directorGender: String,
    directorNationality: {type: String, required: true},
    directorIdType: {type: String},
    directorId: {type: String},
    directorBirthdate: {type: Date},
    directorAddress: {type: String, required: true},
    directorPosition: {type: String, required: true}
  }]
}

module.exports = mongoose.model('Form', schema)

