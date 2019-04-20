const joi = require('joi')
const FormTemplate = require('../models/FormTemplate')

module.exports = {
  validateCreate: async (body) => {
    if (!body && body.formName) {
      return {error: 'no form name provided'}
    }
    const template = await FormTemplate.findOne({formNameEnglish: body.formName})
    const schema = {
    }
    return ({})
  },
  validateUpdate: (body) => ({}) // TODO: Add validation
}