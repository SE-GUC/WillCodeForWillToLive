const Joi = require('joi')
module.exports = {
    validateUpdate: function(body) {
        const schema = Joi.object({
            regulatingLaws: Joi.array().items(Joi.string().min(3).max(30)),
            companyLegalForm: Joi.array().items(Joi.string().min(3).max(30)),
            governorates: Joi.array().items(Joi.object({
                name: Joi.string().min(3).max(30),
                cities: Joi.array().items(Joi.string().min(3).max(30))
            })),
            capitalCurrency: Joi.array().items(Joi.string().min(1).max(5)),
            minimumCapital: Joi.number().precision(2).min(0.00).max(999999999999.99),
            investorType: Joi.array().items(Joi.string().min(3).max(30)),
            idType: Joi.array().items(Joi.string().min(3).max(30))
        })
        return Joi.validate(body, schema)
    }
}