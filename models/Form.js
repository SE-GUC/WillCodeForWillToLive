const mongoose = require('mongoose')

const schema = {
  companyLegalInfo: {
    regulatingLaw: {type: String, required: true},
    companyType: {type: String, required: true},
  },
  companyName: {
    arabic: {type: String, required: true, unique: true},
    english: {type: String}
  },
  hqInfo: {
    governorate: {type: String, required: true},
    city: {type: String, required: true},
    telephone: String,
    fax: String,
  },
  investorInfo: {
    capitalCurrency: {type: String, required: true},
    capital: {type: Number, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    gender: String,
    nationality: {type: String, required: true},
    idType: {type: String},
    idNumber: {type: String},
    birthdate: {type: Date},
    telephone: String,
    fax: String,
    email: String,
    address: {type: String, required: true},
  },
  boardOfDirectors: [{
    name: {type: String, required: true},
    type: {type: String, required: true},
    gender: String,
    nationality: {type: String, required: true},
    idType: {type: String},
    idNumber: {type: String},
    birthdate: {type: Date},
    address: {type: String, required: true},
    position: {type: String, required: true}
  }]
}

module.exports = mongoose.model('Form', schema)

