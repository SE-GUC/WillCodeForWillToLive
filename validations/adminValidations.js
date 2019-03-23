const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
      firstName: Joi.string().min(3).required(),
      middleName: Joi.string().min(3),
      lastName: Joi.string().min(3).required(),
      DOB: Joi.date().required(),
      gender: Joi.string().required(),
      nationality: Joi.string().min(3).required(),
      typeOfID: Joi.string().required(),
      ID: Joi.string().required(),
      jobTitle: Joi.string().min(3).required(),
      mobileNumber: Joi.number(),
      faxNumber: Joi.number(),
      emailAddress: Joi.string(),
      address: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      username: Joi.string(),
      password: Joi.string(),
      firstName: Joi.string().min(3),
      middleName: Joi.string().min(3),
      lastName: Joi.string().min(3),
      DOB: Joi.date(),
      gender: Joi.string(),
      nationality: Joi.string().min(3),
      typeOfID: Joi.string(),
      ID: Joi.string(),
      jobTitle: Joi.string().min(3),
      mobileNumber: Joi.number(),
      faxNumber: Joi.number(),
      emailAddress: Joi.string(),
      address: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }
}
