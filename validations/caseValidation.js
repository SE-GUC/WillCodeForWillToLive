const Joi = require('joi')

module.exports = {
    createValidation: request =>{
        const createSchema = {
            status: Joi.string().required(),
            investor: Joi.string().required(),
            lawyer: Joi.string().required(),
            reviewer: Joi.string().required(),
            company_name: Joi.string().required(),
            reviewed_by_lawyer: Joi.boolean().required(),
            review_comment_by_lawyer: Joi.string(),
            review_date_by_lawyer: Joi.string(),
            reviewed_by_reviewer: Joi.boolean().required(),
            review_comment_by_reviewer: Joi.string(),
            review_date_by_reviewer: Joi.string() ,
            fees: Joi.number(),
            paid: Joi.boolean(),
            currency: Joi.string(),
            formID: Joi.string(),
            priority: Joi.string().min(3).max(300).required(),
            description: Joi.string().min(3).max(300).required(),
            created_at: Joi.string().min(3).max(300).required(),
            isDone: Joi.boolean().required(),
            dueDate: Joi.string().min(3).max(300).required(),
        }
        return Joi.validate(request, createSchema)
    },
    updateValidation: request =>{
        const updateSchema = {
            status: Joi.string(),
            investor: Joi.string(),
            lawyer: Joi.string(),
            reviewer: Joi.string(),
            company_name: Joi.string(),
            reviewed_by_lawyer: Joi.boolean(),
            review_comment_by_lawyer: Joi.string(),
            review_date_by_lawyer: Joi.string(),
            reviewed_by_reviewer: Joi.boolean(),
            review_comment_by_reviewer: Joi.string(),
            review_date_by_reviewer: Joi.string(),
            fees: Joi.number(),
            paid: Joi.boolean(),
            currency: Joi.string(),
            formID: Joi.string(),
            priority: Joi.string().min(3).max(300),
            description: Joi.string().min(3).max(300),
            created_at: Joi.string().min(3).max(300),
            isDone: Joi.boolean(),
            dueDate: Joi.string().min(3).max(300)
        }
        return Joi.validate(request, updateSchema)
    }
}