const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
      firstName: Joi.string().min(3).required(),
      middleName: Joi.string().min(3),
      lastName: Joi.string().min(3).required(),
      DOB: Joi.string().required(),
      gender: Joi.string().required(),
      nationality: Joi.string().min(3).required(),
      mobileNumber: Joi.number().required(),
      faxNumber: Joi.number(),
      emailAddress: Joi.string(),
      address: Joi.string()
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
      DOB: Joi.string(),
      gender: Joi.string(),
      nationality: Joi.string().min(3),
      mobileNumber: Joi.number(),
      faxNumber: Joi.number(),
      emailAddress: Joi.string(),
      address: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }/* ,
  assignlawyerValidation: request => {
    const assignlawyerSchema = {
      lawyer: Joi.string().required()
    }

    return Joi.validate(request, assignlawyerSchema)
  },
  assignreviewerValidation: request => {
    const assignreviewerSchema = {
      reviewer: Joi.string().required()
    }

    return Joi.validate(request, assignreviewerSchema)
  },
  assigntasksValidation: request => {
    const assigntasksSchema = {
      assignee: Joi.string().required()
    }
    return Joi.validate(request, assigntasksSchema)
  } */
}
