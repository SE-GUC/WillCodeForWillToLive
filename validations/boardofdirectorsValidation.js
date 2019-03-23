const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {

        boardOfDirectorsName: Joi.string().required(),
        boardOfDirectorsId: Joi.number().required(),
        boardOfDirectorsGender: Joi.string().required(),
        boardOfDirectorsNationality: Joi.string().required(),
        boardOfDirectorsBirthDate: Joi.date().required(),
        boardOfDirectorsPosition: Joi.string().required(),
        boardOfDirectorsHomeAddress: Joi.string().required(),
        
    }

    return Joi.validate(request, createSchema)
  },
  updateValidation: request => {
    const updateSchema = {
        boardOfDirectorsName: Joi.string(),
        boardOfDirectorsId: Joi.number(),
        boardOfDirectorsGender: Joi.string(),
        boardOfDirectorsNationality: Joi.string(),
        boardOfDirectorsBirthDate: Joi.date(),
        boardOfDirectorsPosition: Joi.string(),
        boardOfDirectorsHomeAddress: Joi.string(),

    }

    return Joi.validate(request, updateSchema)
  }
}
