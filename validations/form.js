const joi = require('joi')

module.exports = {
  validateCreate: (body) => {
    const companyType = body && body.companyType
    if(companyType === undefined) {
      const valid = {
        error: 'Empty body or company type'
      }
      return valid
    }
    const schema = {
      regulatingLaw: joi.string().required(),
      companyType: joi.string().required(),
      companyName: joi.object({
        arabic: joi.string().required(),
        english: joi.string(),
      }),
      hqInfo: joi.object({
        governorate: joi.string().required(),
        city: joi.string().required(),
        telephone: joi.string(),
        fax: joi.string()
      }),
      investorInfo: joi.object({
        capitalCurrency: joi.string().required(),
        capital: joi.number().min(50000).required(),
        name: joi.string().required(),
        type: joi.string().required(),
        gender: joi.string(),
        nationality: joi.string().required(),
        idType: joi.string().when('investorType', {is: 'person', then: joi.required()}),
        idNumber: joi.string().when('investorType', {is: 'person', then: joi.required()}),
        birthdate: joi.date().when('investorType', {is: 'person', then: joi.required()}),
        telephone: joi.string(),
        fax: joi.string(),
        email: joi.string(),
        address: joi.string()
      }),
      boardOfDirectors: joi.array().items(joi.object({
        name: joi.string(),
        type: joi.string(),
        gender: joi.string(),
        nationality: joi.string(),
        idType: joi.string().when('directorType', {is: 'person', then: joi.required()}),
        idNumber: joi.string().when('directorType', {is: 'person', then: joi.required()}),
        birthdate: joi.date().when('directorType', {is: 'person', then: joi.required()}),
        address: joi.string(),
        position: joi.string()
      }))
    }
    return joi.validate(body, schema)
  },
  validateUpdate: (body) => {
    const schema = {
      regulatingLaw: joi.string(),
      companyType: joi.string(),
      companyName: joi.object({
        arabic: joi.string(),
        english: joi.string(),
      }),
      hqInfo: joi.object({
        governorate: joi.string(),
        city: joi.string(),
        telephone: joi.string(),
        fax: joi.string()
      }),
      investorInfo: joi.object({
        capitalCurrency: joi.string(),
        capital: joi.number().min(50000),
        name: joi.string(),
        type: joi.string(),
        gender: joi.string(),
        nationality: joi.string(),
        idType: joi.string(),
        idNumber: joi.string(),
        birthdate: joi.date(),
        telephone: joi.string(),
        fax: joi.string(),
        email: joi.string(),
        address: joi.string()
      }),
      boardOfDirectors: joi.array().items(joi.object({
        name: joi.string(),
        type: joi.string(),
        gender: joi.string(),
        nationality: joi.string(),
        idType: joi.string(),
        idNumber: joi.string(),
        birthdate: joi.date(),
        address: joi.string(),
        position: joi.string()
      }))
    }
    return joi.validate(body, schema)
  },
  validateFees: (body) => {
    const schema = {
      amount: joi.number().precision(2),
      currency: joi.string(),
      isPaid: joi.boolean()
    }
  }
}