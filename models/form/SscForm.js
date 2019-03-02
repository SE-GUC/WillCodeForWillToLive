// npm imports
const uuid = require('uuid')
const joi = require('joi')

// Global constants
// Lists
const regdulatingLawList = ["law1", "law2"]
const companyLegalFormList = ["form1", "form2"]
const governerateList = ["gov1", "gov2"]
const cityList = ["city1", "city2"]
const currencyList = ["cur1", "cur2"]
const genderList = ["g1", "g2"]
const nationalityList = ["n1", "n2"]
const idTypeList = ["id1", "id2"]
const boardPositionList = ["pos1", "pos2"]
// fields
const minCapital = 50000

// Schemas
const companyNameSchema =  {
    arabic : joi.string().min(3).required(),
    english : joi.string().min(3)
}

const hqInfoSchema = {
    governerate : joi.any().valid(governerateList).required(),
    city : joi.any().valid(cityList).required(),
    address : joi.string().min(3).required(),
    telephone : joi.number(),
    fax : joi.number()
}

const investorInfoSchema = {
    financialData :
    {
        currency : joi.any().valid(currencyList).required(),
        capital : joi.number().min(minCapital).max(999999999999).precision(2).required(),
    },
    investor : 
    {
        name : joi.string().min(3).required(),
        gender : joi.any().valid(genderList).required(),
        nationality : joi.any().valid(nationalityList).required(),
        idType : joi.any().valid(idTypeList).required(),
        id : joi.string().min(3).required(),
        birthdate : joi.date().required(),
        telephone : joi.number(),
        fax : joi.number(),
        email : joi.string().email(),
        homeAddress : joi.string().min(3).required()
    }
}

const boardOfDirectorsSchema = {
    name : joi.string().min(3).required(),
    gender : joi.any().valid(genderList).required(),
    nationality : joi.any().valid(nationalityList).required(),
    idType : joi.any().valid(idTypeList).required(),
    id : joi.string().min(3).required(),
    birthdate : joi.date().required(),
    homeAddress : joi.string().min(3).required(),
    position : joi.any().valid(boardPositionList).required(),
}

const schema = {
    regdulatingLaw : joi.any().valid(regdulatingLawList).required(),
    companyLegalForm : joi.any().valid(companyLegalFormList).required(),
    companyName : companyNameSchema,
    hqInfo : hqInfoSchema,
    investorInfo : investorInfoSchema,
    boardOfDirectors : joi.array().items(boardOfDirectorsSchema)
}

// Model class implementation
class Form{
    constructor(regulatingLaw, companyLegalForm, hqInfo, investorInfo, boardOfDirectors){
        this.id = uuid.v4()
        this.regdulatingLaw = regulatingLaw
        this.companyLegalForm = companyLegalForm
        this.hqInfo = hqInfo
        this.investorInfo = investorInfo
        this.boardOfDirectors = boardOfDirectors
    }
    
    static getSchema(){
        return schema
    }
}

module.exports = Form