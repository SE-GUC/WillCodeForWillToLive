const Joi = require('joi')
const FormProperties = require('../models/SpcFormProperties')

module.exports = {
    validateCreate: async function (body) {
        props = await FormProperties.getSingleton()
        const schema = Joi.object({
            regulatingLaw: Joi.string().allow(props.regulatingLaw).required(),
            companyLegalForm: Joi.string().allow(props.companyLegalForm).required(),
            companyName: Joi.object({
                arabic: Joi.string().min(3).max(30).required(),
                english: Joi.string().min(3).max(30)
            }).required(),
            hqInfo: Joi.object({
                governorate: Joi.string().allow(...props.governorate.map(gov => gov.name)).required(),
                city: Joi.string().allow(...(props.governorate.filter(gov => gov.name === body.governorate)[0].city)).required(),
                address: Joi.string().min(3).max(200).required(),
                telephone: Joi.string().min(8).max(8),
                fax: Joi.string().min(8).max(8)
            }).required(),
            investorInfo: Joi.object({
                capitalCurrency: Joi.string().allow(props.capitalCurrency).required(),
                capital: Joi.number().precision(2).min(props.minimumCapital).max(999999999999.99).required(),
                name: Joi.string().min(3).max(30).required(),
                investorType: Joi.string().allow(props.investorType).required(),
                gender: Joi.string().allow(props.gender),
                nationality: Joi.string().allow(props.nationality).required(),
                idType: Joi.string().when('nationality', {
                    is: 'Egyptian',
                    then: Joi.allow(['nationalID'])
                }).when('investorType', {
                    is: 'person',
                    then: Joi.required()
                }),
                idNumber: Joi.string().when('investorType', {
                    is: 'person',
                    then: Joi.required()
                }),
                birthDate: Joi.diff('YEARS', new Date(), 21).when('investorType', {
                    is: 'person',
                    then: Joi.required()
                }),
                address: Joi.string().min(3).max(200).required(),
                telephone: Joi.string().min(8).max(8),
                fax: Joi.string().min(8).max(8),
                email: Joi.string().email()
            }).required(),
            boardOfDirectors: Joi.array.items(object({
                name: Joi.string().min(3).max(30).required(),
                investorType: Joi.string().allow(props.investorType).required(),
                gender: Joi.string().allow(props.gender),
                nationality: Joi.string().allow(props.nationality).required(),
                idType: Joi.string().when('nationality', {
                    is: 'Egyptian',
                    then: Joi.allow(['nationalID'])
                }).when('investorType', {
                    is: 'person',
                    then: Joi.required()
                }),
                idNumber: Joi.string().when('investorType', {
                    is: 'person',
                    then: Joi.required()
                }),
                birthDate: Joi.diff('YEARS', new Date(), 21).when('investorType', {
                    is: 'person',
                    then: Joi.required()
                }),
                address: Joi.string().min(3).max(200).required(),
                position: Joi.string().allow(props.position).required()
            })).required()
        })
        return Joi.validate(schema)
    },

    validateUpdate: async function (body, cb) {
        const props = await FormProperties.getSingleton()
        const schema = Joi.object({
            regulatingLaw: Joi.string().allow(props.regulatingLaw),
            companyLegalForm: Joi.string().allow(props.companyLegalForm),
            companyName: Joi.object({
                arabic: Joi.string().min(3).max(30),
                english: Joi.string().min(3).max(30)
            }),
            hqInfo: Joi.object({
                governorate: Joi.string().allow(...props.governorate.map(gov => gov.name)).required(),
                city: Joi.string().allow(...(props.governorate.filter(gov => gov.name === body.governorate)[0].city)).required(),
                address: Joi.string().min(3).max(200),
                telephone: Joi.string().min(8).max(8),
                fax: Joi.string().min(8).max(8)
            }),
            investorInfo: Joi.object({
                capitalCurrency: Joi.string().allow(props.capitalCurrency),
                capital: Joi.number().precision(2).min(props.minimumCapital).max(999999999999.99),
                name: Joi.string().min(3).max(30),
                investorType: Joi.string().allow(props.investorType),
                gender: Joi.string().allow(props.gender),
                nationality: Joi.string().allow(props.nationality),
                idType: Joi.string().when('nationality', {
                    is: 'Egyptian',
                    then: Joi.allow(['nationalID'])
                }),
                idNumber: Joi.string(),
                birthDate: Joi.diff('YEARS', new Date(), 21),
                address: Joi.string().min(3).max(200),
                telephone: Joi.string().min(8).max(8),
                fax: Joi.string().min(8).max(8),
                email: Joi.string().email()
            }),
        })
        return Joi.validate(schema)
    }
}