const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
<<<<<<< HEAD
      id: Joi.number().required(),
=======
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
      CompanyName: Joi.string().required(),
      CompanyNationality: Joi.string().required(),
      CompanyName_English: Joi.string(),
      RegulatedLaw: Joi.string().required(),
      Currency: Joi.string().required(),
      Capital: Joi.number().min(50000).required(),
      CreatedAt: Joi.date().required(),
      FormOfLegalCompany: Joi.string().required(),
      Governorate: Joi.string().required(),
      City: Joi.string().required(),
      Address: Joi.string().required(),
<<<<<<< HEAD
      boardOfDirectorsName: Joi.string().required(),
      boardOfDirectorsId: Joi.number().required(),
      boardOfDirectorsGender: Joi.string().required(),
      boardOfDirectorsNationality: Joi.string().required(),
      boardOfDirectorsBirthDate: Joi.date().required(),
      boardOfDirectorsPosition: Joi.string().required(),
      boardOfDirectorsHomeAddress: Joi.string().required(),
      Reviewed: Joi.boolean().required(),
      ReviewedComment: Joi.string(),
      ReviewedDate: Joi.date(),
      Status: Joi.boolean().required(),
=======
      Reviewed: Joi.boolean().required(),
      ReviewedComment: Joi.string(),
      ReviewedDate: Joi.date(),
      Status: Joi.string().required(),
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
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
<<<<<<< HEAD
        id: Joi.number(),
=======
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
        CompanyName: Joi.string(),
        CompanyNationality: Joi.string(),
        CompanyName_English: Joi.string(),
        RegulatedLaw: Joi.string(),
<<<<<<< HEAD
        Currency: Joi.number(),
=======
        Currency: Joi.string(),
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
        Capital: Joi.number().min(50000),
        CreatedAt: Joi.date(),
        FormOfLegalCompany: Joi.string(),
        Governorate: Joi.string(),
        City: Joi.string(),
        Address: Joi.string(),
<<<<<<< HEAD
        boardOfDirectorsName: Joi.string(),
        boardOfDirectorsId: Joi.number(),
        boardOfDirectorsGender: Joi.string(),
        boardOfDirectorsNationality: Joi.string(),
        boardOfDirectorsBirthDate: Joi.date(),
        boardOfDirectorsPosition: Joi.string(),
        boardOfDirectorsHomeAddress: Joi.string(),
        Reviewed: Joi.boolean(),
=======
         Reviewed: Joi.boolean(),
>>>>>>> 8ee1e595024723d4faa0916b71b2767888e329fe
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
