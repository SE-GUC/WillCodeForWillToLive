const joi = require('joi')

module.exports = {
  validateCreate: (body) => {
    const directorSchema = joi.object({
      directorName: joi.string(),
      directorType: joi.string(),
      directorGender: joi.string(),
      directorNationality: joi.string(),
      directorIdType: joi.string().when('directorType', {is: 'person', then: joi.required()}),
      directorId: joi.string().when('directorType', {is: 'person', then: joi.required()}),
      directorBirthdate: joi.date().when('directorType', {is: 'person', then: joi.required()}),
      directorAddress: joi.string(),
      directorPosition: joi.string()
    })
    const schema = {
      regulatingLaw: joi.string().required(),
      companyType: joi.string().required(),
      companyNameArabic: joi.string().required(),
      companyNameEnglish: joi.string().required(),
      hqGovernorate: joi.string().required(),
      hqCity: joi.string().required(),
      hqTelephone: joi.string(),
      hqFax: joi.string(),
      capitalCurrency: joi.string().required(),
      capital: joi.number().min(50000).required(),
      investorName: joi.string().required(),
      investorType: joi.string().required(),
      investorGender: joi.string(),
      investorNationality: joi.string().required(),
      investorIdType: joi.string().when('investorType', {is: 'person', then: joi.required()}),
      investorId: joi.string().when('investorType', {is: 'person', then: joi.required()}),
      investorBirthdate: joi.date().when('investorType', {is: 'person', then: joi.required()}),
      investorTelephone: joi.string(),
      investorFax: joi.string(),
      investorEmail: joi.string(),
      investorAddress: joi.string(),
      boardOfDirectors: joi.array().items(directorSchema)
    }
    return joi.validate(body, schema)
  },
  validateUpdate: (body) => {
    const directorSchema = joi.object({
      directorName: joi.string(),
      directorType: joi.string(),
      directorGender: joi.string(),
      directorNationality: joi.string(),
      directorIdType: joi.string(),
      directorId: joi.string(),
      directorBirthdate: joi.date(),
      directorAddress: joi.string(),
      directorPosition: joi.string()
    })
    const schema = {
      regulatingLaw: joi.string(),
      companyType: joi.string(),
      companyNameArabic: joi.string(),
      companyNameEnglish: joi.string(),
      hqGovernorate: joi.string(),
      hqCity: joi.string(),
      hqTelephone: joi.string(),
      hqFax: joi.string(),
      capitalCurrency: joi.string(),
      capital: joi.number().min(50000),
      investorName: joi.string(),
      investorType: joi.string(),
      investorGender: joi.string(),
      investorNationality: joi.string(),
      investorIdType: joi.string(),
      investorId: joi.string(),
      investorBirthdate: joi.date(),
      investorTelephone: joi.string(),
      investorFax: joi.string(),
      investorEmail: joi.string(),
      investorAddress: joi.string(),
      boardOfDirectors: joi.array().items(directorSchema)
    }
    return joi.validate(body, schema)
  }
}