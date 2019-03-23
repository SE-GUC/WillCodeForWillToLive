const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            username: Joi.string().min(3).max(300).required(),
            password: Joi.string().min(3).max(300).required(),
            name: Joi.string().min(3).max(300).required(),
            birth_date: Joi.string().min(3).max(300).required(),
            gender: Joi.string().min(3).max(300).required(),
            nationallity: Joi.string().min(3).max(300).required(),
            type_of_ID: Joi.string().min(3).max(300).required(),
            mobile_number: Joi.string().min(3).max(300).required(),
            fax_number: Joi.string().min(3).max(300).required(),
            email: Joi.string().min(3).max(300).required(),
            address: Joi.string().min(3).max(300).required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            username: Joi.string().min(3).max(300),
            password: Joi.string().min(3).max(300),
            name: Joi.string().min(3).max(300),
            birth_date: Joi.string().min(3).max(300),
            gender: Joi.string().min(3).max(300),
            nationallity: Joi.string().min(3).max(300),
            type_of_ID: Joi.string().min(3).max(300),
            mobile_number: Joi.string().min(3).max(300),
            fax_number: Joi.string().min(3).max(300),
            email: Joi.string().min(3).max(300),
            address: Joi.string().min(3).max(300)
        }
        return Joi.validate(request, updateSchema)
    }
}
