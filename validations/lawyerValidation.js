
const Joi = require("joi");
module.exports = {
  createValidation: request => {
    const createSchema = {
      email_address: Joi.string().required(),
      password: Joi.string().required(),
      typeOfID: Joi.string().required(),
      name: Joi.string().required(),
      nationality: Joi.string().required(),
      birth_date: Joi.date().required(),
      mobile_number: Joi.string().required(),
      fax_number: Joi.number().required(),
      gender: Joi.string().required(),
      username: Joi.string().required()
    };
    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      email_address: Joi.string().email(),
      password: Joi.string(),
      typeOfID: Joi.string(),
      name: Joi.string(),
      nationality: Joi.string(),
      birth_date: Joi.date(),
      mobile_number: Joi.string(),
      fax_number: Joi.number(),
      gender: Joi.string(),
      username: Joi.string()
    };
    return Joi.validate(request, updateSchema);
  },
  assigncaseslawyerValidation: request => {
    const assignlawyerSchema = {
      lawyer: Joi.string().required()
    }
    return Joi.validate(request, assignlawyerSchema)
  }
};
