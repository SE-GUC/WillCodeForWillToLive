const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
      typeOfID: Joi.string().required(),
      name: Joi.string().required(),
      nationality: Joi.string().required(),
      capital: Joi.number().required(),
      DOB: Joi.date().required(),
      mobileNumber: Joi.number().required(),
      address: Joi.string().required(),
      faxNumber: Joi.number().required(),
      gender: Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      email: Joi.string(),
      password: Joi.string(),
      typeOfID: Joi.string(),
      name: Joi.string(),
      nationality: Joi.string(),
      capital: Joi.number(),
      DOB: Joi.date(),
      mobileNumber: Joi.number(),
      address: Joi.string(),
      faxNumber: Joi.number(),
      gender: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  }
};