const Joi = require('joi')

module.exports = {
    createValidation: request =>{
        const createSchema = {
            CompanyName: Joi.string().required(),
            CompanyType: Joi.string().required(),
            EstablishmentDate: Joi.date().required(),
            InvestorName: Joi.string().required(),
            InvestorId: Joi.string().required(),
           // CapitalCurrency: Joi.string().required(),
            Capital: Joi.number().required(),
            RegulatingLaw: Joi.string().required(),
            CompanyLegalForm: Joi.string().required(),
            Governorate: Joi.string().required(),
            City: Joi.string().required(),
            Address: Joi.string().min(3).max(200).required(),
            Telephone: Joi.string().min(8).max(8).required(),
            Fax: Joi.string().min(8).max(8).required()
        }
        return Joi.validate(request, createSchema)
    },
    updateValidation: request =>{
        const updateSchema = {
            CompanyName: Joi.string(),
            CompanyType: Joi.string(),
            EstablishmentDate: Joi.date(),
            InvestorName: Joi.string(),
            //CapitalCurrency: Joi.string().required(),
            Capital: Joi.number(),
            RegulatingLaw: Joi.string(),
            CompanyLegalForm: Joi.string(),
            Governorate: Joi.string(),
            City: Joi.string(),
            Address: Joi.string().min(3).max(200),
            Telephone: Joi.string().min(8).max(8),
            Fax: Joi.string().min(8).max(8)
        }
        return Joi.validate(request, updateSchema)
    }
}