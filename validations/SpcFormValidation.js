const Joi = require('Joi')
const FormProperties = require('../models/SpcFormProperties')

module.exports = {
    validateCreate: function (body, cb) {
        FormProperties.getSingleton(function (err, props) {
            if (err) {
                cb(err, null)
            } else {
                // Check if the body isn't empty
                if (!body) {
                    return cb('empty body', null)
                }
                // Check if the governorate exists
                if (!(body.hqInfo && body.hqInfo.governorate && body.hqInfo.governorate.city && body.investorInfo.investorInfo.investorType)) {
                    return cb('missing info', null)
                }
                // Validate governorate and city
                if (props.governorate.findIndex(gov => gov.name === body.hqInfo.governorate) === -1) {
                    return cb(`governorate ${body.hqInfo.governorate} does not exist in the database`, null)
                } else {
                    const govIndex = props.governorate.findIndex(gov => gov.name === body.hqInfo.governorate)
                    if (props.governorate[govIndex].city.findIndex(city => city === body.hqInfo.city) === -1) {
                        return cb(`city ${body.hqInfo.city} does not exist in the database`, null)
                    }
                }
                                // Validate the rest of the schema
                                const schema = Joi.object({
                                    regulatingLaw: Joi.string().allow(props.regulatingLaw).required(),
                                    companyLegalForm: Joi.string().allow(props.companyLegalForm).required(),
                                    companyName: Joi.object({
                                        arabic: Joi.string().min(3).max(30).required(),
                                        english: Joi.string().min(3).max(30)
                                    }).required(),
                                    hqInfo: Joi.object({
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
                                        idType: Joi.string().when('nationality', {is: 'Egyptian', then: Joi.allow(['nationalID'])}).when('investorType', {is: 'person', then: Joi.required()}),
                                        idNumber: Joi.string().when('investorType', {is: 'person', then: Joi.required()}),
                                        birthDate: Joi.diff('YEARS', new Date(), 21).when('investorType', {is: 'person', then: Joi.required()}),
                                        address: Joi.string().min(3).max(200).required(),
                                        telephone: Joi.string().min(8).max(8),
                                        fax: Joi.string().min(8).max(8),
                                        email: Joi.string().email()
                                    }).required(),
                                })
                                const valid = Joi.validate(schema)
                                cb(valid.error, body)
                            }
                        })
                    },
                    validateUpdate: function (body, cb) {
                        FormProperties.getSingleton(function (err, props) {
                            if (err) {
                                cb(err, null)
                            } else {
                                const schema = Joi.object({
                                    regulatingLaw: Joi.string().allow(props.regulatingLaw),
                                    companyLegalForm: Joi.string().allow(props.companyLegalForm),
                                    companyName: Joi.object({
                                        arabic: Joi.string().min(3).max(30),
                                        english: Joi.string().min(3).max(30)
                                    }),
                                    hqInfo: Joi.object({
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
                                        idType: Joi.string().when('nationality', {is: 'Egyptian', then: Joi.allow(['nationalID'])}),
                                        idNumber: Joi.string(),
                                        birthDate: Joi.diff('YEARS', new Date(), 21),
                                        address: Joi.string().min(3).max(200),
                                        telephone: Joi.string().min(8).max(8),
                                        fax: Joi.string().min(8).max(8),
                                        email: Joi.string().email()
                                    }),
                                })
                                const valid = Joi.validate(schema)
                                cb(valid.error, body)
                            }
                        })
                    }
                }