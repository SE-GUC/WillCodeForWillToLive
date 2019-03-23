const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      CompanyName: Joi.string().required(),
      CompanyNationality: Joi.string().required(),
      CompanyName_English: Joi.string(),
      Currency: Joi.number().required(),
      Capital: Joi.number().required(),
      CreatedAt: Joi.date().required(),
      RegulatedLaw: Joi.string().required(),
      FormOfLegalCompany: Joi.string().required(),
      Governorate: Joi.string().required(),
      City: Joi.string().required(),
      Address: Joi.string().required(),
      Reviewed: Joi.boolean().required(),
      ReviewedComment: Joi.string(),
      ReviewedDate: Joi.date(),
      Status: Joi.string().required(),
      Fax: Joi.string().required(),
      LawyerName: Joi.string().required(),
      InvestorName: Joi.string().required(),
      InvestorGender: Joi.string().required(),
      InvestorNationality: Joi.string().required(),
      InvestorId: Joi.number().required(),
      InvestorBirthdate: Joi.date().required(),
      InvestorTelephone: Joi.number().required(),
      InvestorFax: Joi.string().required(),
      InvestorEmail: Joi.string().required(),
      InvestorHomeAddress: Joi.string().required(),
    }

    return Joi.validate(request, createSchema)
  },
  updateValidation: request => {
    const updateSchema = {
        CompanyName: Joi.string(),
        CompanyNationality: Joi.string(),
        CompanyName_English: Joi.string(),
        RegulatedLaw: Joi.string(),
        Currency: Joi.number(),
        Capital: Joi.number(),
        CreatedAt: Joi.date(),
        FormOfLegalCompany: Joi.string(),
        Governorate: Joi.string(),
        City: Joi.string(),
        Address: Joi.string(),
        Reviewed: Joi.boolean(),
        ReviewedComment: Joi.string(),
        ReviewedDate: Joi.date(),
        Status: Joi.string(),
        Fax: Joi.string(),
      LawyerName: Joi.string(),
      InvestorName: Joi.string(),
      InvestorGender: Joi.string(),
      InvestorNationality: Joi.string(),
      InvestorId: Joi.number(),
      InvestorBirthdate: Joi.date(),
      InvestorTelephone: Joi.number(),
      InvestorFax: Joi.string(),
      InvestorEmail: Joi.string(),
      InvestorHomeAddress: Joi.string(),

    }

    return Joi.validate(request, updateSchema)
  }
}
