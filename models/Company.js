const joi = require('joi')
const uuid = require('uuid')

class Company{
    constructor(companyName, establishmentDate, investorName, companyStatus){ // TODO: Complete company attributes
        this.uuid = uuid.v4()
        this.companyName = companyName
        this.establishmentDate = establishmentDate
        this.investorName = investorName
        this.companyStatus = companyStatus
    }

   static getSchema(){
       return {
        companyName : joi.string().min(3).required(),
        establishmentDate : joi.date().required(),
        investorName : joi.string().min(3).required(),
        companyStatus : joi.string().min(3).required()
       }
    }
}

module.exports = Company;