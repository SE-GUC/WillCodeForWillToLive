const joi = require('joi')
module.exports = {
    validateUpdate: function(body) {
        const schema = joi.object({
            regulatingLaws: joi.array().items(joi.string().min(3).max(30)),
            companyLegalForm: joi.array().items(joi.string().min(3).max(30)),
            governorates: joi.array().items(joi.object({
                name: joi.string().min(3).max(30),
                cities: joi.array().items(joi.string().min(3).max(30))
            })),
            capitalCurrency: joi.array().items(joi.string().min(1).max(5)),
            minimumCapital: joi.number().precision(2).min(0.00).max(999999999999.99),
            investorType: joi.array().items(joi.string().min(3).max(30)),
            idType: joi.array().items(joi.string().min(3).max(30))
        })
        return joi.validate(body, schema)
    }
}