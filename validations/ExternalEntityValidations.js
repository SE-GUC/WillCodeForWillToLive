const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().required(),
            emailAddress: Joi.string().required(),
            nationality: Joi.string().required(),
            typeofID: Joi.string().required(),
            mobileNumber: Joi.number().required(),
            faxNumber: Joi.number().required(),
            address: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string(),
            emailAddress: Joi.string(),
            nationality: Joi.string(),
            typeofID: Joi.string(),
            mobileNumber: Joi.number(),
            faxNumber: Joi.string(),
            address: Joi.string(),
            username: Joi.string(),
            password: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
}