const Joi = require('joi')

module.exports = {
    createValidation: request =>{
        const createSchema = {
            status: Joi.string().required(),
            investor: Joi.string().required(),
            lawyer: Joi.string().required(),
            reviewer: Joi.string().required(),
            company_name: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },
    updateValidation: request =>{
        const updateSchema = {
            status: Joi.string(),
            investor: Joi.string(),
            lawyer: Joi.string(),
            reviewer: Joi.string(),
            company_name: Joi.string()
        }
        return Joi.validate(request, updateSchema)
    }
}