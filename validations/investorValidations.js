const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(10).max(20).required(),
            address: Joi.string().min(10).max(1000000).required(),
            capital: Joi.number().min(0).max(100).required(),
            gender: Joi.string().min(0).max(1000000).required(),
            nationality: Joi.string().min(0).max(1000000).required(),
            typeOfID: Joi.string().min(0).max(1000000).required(),
            email: Joi.string().min(0).max(1000000).required(),
            mobileNumber: Joi.number().min(0).max(100).required(),
            faxNumber: Joi.number().min(0).max(100).required()

        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(10).max(20).required(),
            address: Joi.string().min(10).max(1000000).required(),
            capital: Joi.number().min(0).max(100).required(),
            gender: Joi.string().min(0).max(1000000).required(),
            nationality: Joi.string().min(0).max(1000000).required(),
            typeOfID: Joi.string().min(0).max(1000000).required(),
            email: Joi.string().min(0).max(1000000).required(),
            mobileNumber: Joi.number().min(0).max(100).required(),
            faxNumber: Joi.number().min(0).max(100).required()

        }
        return Joi.validate(request, updateSchema)
    }, 
}