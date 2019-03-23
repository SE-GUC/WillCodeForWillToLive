const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            priority: Joi.string().min(3).max(300).required(),
            description: Joi.string().min(3).max(300).required(),
            created_at: Joi.string().min(3).max(300).required(),
            isDone: Joi.boolean().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            priority: Joi.string().min(3).max(300),
            description: Joi.string().min(3).max(300),
            created_at: Joi.string().min(3).max(300),
            isDone: Joi.boolean()
        }
        return Joi.validate(request, updateSchema)
    }
}