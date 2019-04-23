const Joi = require('joi')

module.exports = {
    createValidation: request =>{
        const createSchema = {
            formId: Joi.string().required(),
            companyEstablishmentDate: Joi.date()
        }
        return Joi.validate(request, createSchema)
    },
    updateValidation: request =>{
        const updateSchema = {
            formId: Joi.string(),
            companyEstablishmentDate: Joi.date()
        }
        return Joi.validate(request, updateSchema)
    }
}