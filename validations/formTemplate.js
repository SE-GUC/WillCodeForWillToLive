const joi = require('joi')

module.exports = {
    validateCreate: body => {
        const schema = joi.schema({
            formNameArabic: joi.string().required(),
            formNameEnglish: joi.string().required(),
            fields: joi.array.items(object({
                type: joi.string().allow(['string', 'number', 'date']).required(),
                nameArabic: joi.string().required(),
                nameEnglish: joi.string().required(),
                required: joi.boolean().required(),
                constraints: joi.array().items(joi.object({
                    name: joi.string().required(),
                    value: joi.string().required(),
                })).required()
            })).required()
        })
        return joi.validate(body, schema)
    },
    validateUpdate: body => {
        const schema = joi.schema({
            formNameArabic: joi.string(),
            formNameEnglish: joi.string(),
            fields: joi.array.items(object({
                type: joi.string().allow(['string', 'number', 'date']),
                nameArabic: joi.string(),
                nameEnglish: joi.string(),
                required: joi.boolean(),
                constraints: joi.array().items(joi.object({
                    name: joi.string(),
                    value: joi.string(),
                }))
            }))
        })
        return joi.validate(body, schema)
    }
}