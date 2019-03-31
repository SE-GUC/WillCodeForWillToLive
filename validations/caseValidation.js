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
            review_date_by_reviewer: Joi.string()         
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
            review_date_by_reviewer: Joi.string()  
        }
        return Joi.validate(request, updateSchema)
    }
}