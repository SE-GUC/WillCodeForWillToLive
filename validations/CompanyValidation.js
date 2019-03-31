const Joi = require('joi')

module.exports = {
    createValidation: request =>{
        const createSchema = {
            companyName: Joi.string().required(),
            CompanyType: Joi.string().required(),
            establishmentDate: Joi.date().required(),
            InvestorName: Joi.string().required(),
            CapitalCurrency: Joi.string().required(),
            Capital: Joi.number().required(),
            RegulatingLaw: Joi.string().required(),
            CompanyLegalForm: Joi.string().required(),
            hqInfo: Joi.object({
                Governorate: Joi.string(),
                City: Joi.string(),
                Address: Joi.string().min(3).max(200).required(),
                Telephone: Joi.string().min(8).max(8),
                Fax: Joi.string().min(8).max(8)
            }).required()
        }
        return Joi.validate(request, createSchema)
    },
    updateValidation: request =>{
        const updateSchema = {
            companyName: Joi.string().required(),
            CompanyType: Joi.string().required(),
            establishmentDate: Joi.date().required(),
            InvestorName: Joi.string().required(),
            CapitalCurrency: Joi.string().required(),
            Capital: Joi.number().required(),
            RegulatingLaw: Joi.string().required(),
            CompanyLegalForm: Joi.string().required(),
            hqInfo: Joi.object({
                Governorate: Joi.string(),
                City: Joi.string(),
                Address: Joi.string().min(3).max(200).required(),
                Telephone: Joi.string().min(8).max(8),
                Fax: Joi.string().min(8).max(8)
            }).required()
        }
        return Joi.validate(request, updateSchema)
    }
}