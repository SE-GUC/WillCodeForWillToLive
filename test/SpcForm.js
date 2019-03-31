const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const SpcForm = require('../models/SpcForm')

class SpcFormTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
            regulatingLaw: null,
            companyLegalForm: null,
            companyName: null,
            hqInfo:{
                governorate:null,
                city: null,
                address: null,
                telephone: null,
                fax: null
            },
            investorInfo: {
                capitalCurrency: null, 
                capital: null,
                name: null,
                investorType: null ,
                gender: null,
                nationality: null ,
                idType: null,
                idNumber: null,
                birthDate: null,
                address: null,
                telephone: null,
                fax: null,
                email: null
            },
            createdAt:null
            }
        }
    
    runIndependently(){
        try{
            return new Promise((resolve, reject) => {
                describe('Making sure independent SpcForm routes work',() =>{
                    this.postRequestWithMissingParameters()
                    this.postRequestIndependently()
                    this.getRequestIndependently()
                    this.getRequestWithWrongID()
                    this.putRequestWrongParamaters()
                    this.putRequestWithWrongID()
                    this.putRequestIndependently()
                    this.deleteRequestIndependently()
                })
                resolve()
            })
        }
        catch(error){

        }
    }

    postRequestWithMissingParameters() {
        const requestBody = {
            regulatingLaw: "bla",
            companyLegalForm: "72",
            companyName: {
                arabic:"abby's",
                english:"bla"
            },
            hqInfo:{
                governorate:"Cairo",
                city: "bla",
                address: "21 sydney st",
                telephone: "1121234345",
                fax: "faxb1235weirdffgLalala"
            },
            investorInfo: {
                capitalCurrency: "egp", 
                capital: 500008,
                name: "foolan",
                investorType: "bla" ,
                gender: "male",
                nationality: "egyptian" ,
                idType: "bla",
                idNumber: "3574873532",
                //birthDate: "2-3-1980",
                address: "66 st 99",
                telephone: "2316364385486",
                fax: "gg46583thah4527",
                email: "bla"
            },
            //createdAt:"1-1-1970"
        }

        test(`Randomly creating a new SpcForm with a missing parameter,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).toEqual(['error'])
        },100000)
    }

    postRequestIndependently() {
        const requestBody = {
            regulatingLaw: 'bla',
            companyLegalForm: '72',
            companyName: {
                arabic:'abbys',
                english:'bla'
            },
            hqInfo:{
                governorate:'Cairo',
                city: 'bla',
                address: '21 sydney st',
                telephone: '1121234345',
                fax: 'faxb1235weirdffgLalala'
            },
            investorInfo: {
                capitalCurrency: 'egp', 
                capital: 500008,
                name: 'foolan',
                investorType: 'bla' ,
                gender: 'male',
                nationality: 'egyptian' ,
                idType: 'bla',
                idNumber: '3574873532',
                //birthDate: "2-3-1980",
                address: '66 st 99',
                telephone: '2316364385486',
                fax: 'gg46583thah4527',
                email: 'bla'
            },
            //createdAt:"1-1-1970"
        }

        test(`Randomly creating a new SpcForm,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).toEqual(['data'])

              const SpcFormElement = await SpcForm.findById(jsonResponse.data._id).exec()
              expect(SpcFormElement).toMatchObject(requestBody)
              this.sharedState.regulatingLaw = SpcFormElement.regulatingLaw
              this.sharedState.companyLegalForm = SpcFormElement.companyLegalForm
              this.sharedState.companyName.arabic = SpcFormElement.companyName.arabic
              this.sharedState.companyName.english = SpcFormElement.companyName.english
              this.sharedState.hqInfo.governorate = SpcFormElement.hqInfo.governorate
              this.sharedState.hqInfo.city = SpcFormElement.hqInfo.city
              this.sharedState.hqInfo.address = SpcFormElement.hqInfo.address
              this.sharedState.hqInfo.telephone = SpcFormElement.hqInfo.telephone
              this.sharedState.hqInfo.fax = SpcFormElement.hqInfo.fax
              this.sharedState.investorInfo.capitalCurrency = SpcFormElement.investorInfo.capitalCurrency
              this.sharedState.investorInfo.capital = SpcFormElement.investorInfo.capital
              this.sharedState.investorInfo.name = SpcFormElement.investorInfo.name
              this.sharedState.investorInfo.investorType = SpcFormElement.investorInfo.investorType
              this.sharedState.investorInfo.gender = SpcFormElement.investorInfo.gender
              this.sharedState.investorInfo.nationality = SpcFormElement.investorInfo.nationality
              this.sharedState.investorInfo.idType = SpcFormElement.investorInfo.idType
              this.sharedState.investorInfo.idNumber = SpcFormElement.investorInfo.idNumber
              this.sharedState.investorInfo.address = SpcFormElement.investorInfo.address
              this.sharedState.investorInfo.telephone = SpcFormElement.investorInfo.telephone
              this.sharedState.investorInfo.fax = SpcFormElement.investorInfo.fax
              this.sharedState.investorInfo.email = SpcFormElement.investorInfo.email
             // this.sharedState.createdAt = SpcFormElement.createdAt
        },100000)
    }

    
    getRequestIndependently () {
        test(`Fetching the data of that random SpcForm,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            expect(jsonResponse.data.regulatingLaw).toEqual(this.sharedState.regulatingLaw)
            expect(jsonResponse.data.companyLegalForm).toEqual(this.sharedState.companyLegalForm)
            expect(jsonResponse.data.companyName.arabic).toEqual(this.sharedState.companyName.arabic)
            expect(jsonResponse.data.companyName.english).toEqual(this.sharedState.companyName.english)
            expect(jsonResponse.data.hqInfo.governorate).toEqual( this.sharedState.hqInfo.governorate)
            expect(jsonResponse.data.hqInfo.city).toEqual(this.sharedState.hqInfo.city)
            expect(jsonResponse.data.hqInfo.address).toEqual(this.sharedState.hqInfo.address)
            expect(jsonResponse.data.hqInfo.telephone).toEqual(this.sharedState.hqInfo.telephone)
            expect(jsonResponse.data.hqInfo.fax).toEqual(this.sharedState.hqInfo.fax)
            expect(jsonResponse.data.investorInfo.capitalCurrency).toEqual(this.sharedState.investorInfo.capitalCurrency)
            expect(jsonResponse.data.investorInfo.capital).toEqual(this.sharedState.investorInfo.capital)
            expect(jsonResponse.data.investorInfo.name).toEqual(this.sharedState.investorInfo.name)
            expect(jsonResponse.data.investorInfo.investorType).toEqual(this.sharedState.investorInfo.investorType)
            expect(jsonResponse.data.investorInfo.gender).toEqual(this.sharedState.investorInfo.gender)
            expect(jsonResponse.data.investorInfo.nationality).toEqual(this.sharedState.investorInfo.nationality)
            expect(jsonResponse.data.investorInfo.idType).toEqual(this.sharedState.investorInfo.idType)
            expect(jsonResponse.data.investorInfo.idNumber).toEqual(this.sharedState.investorInfo.idNumber)
            expect(jsonResponse.data.investorInfo.address).toEqual(this.sharedState.investorInfo.address)
            expect(jsonResponse.data.investorInfo.telephone).toEqual(this.sharedState.investorInfo.telephone)
            expect(jsonResponse.data.investorInfo.fax).toEqual(this.sharedState.investorInfo.fax)
            expect(jsonResponse.data.investorInfo.email).toEqual(this.sharedState.investorInfo.email)
            //expect(jsonResponse.data.createdAt).toEqual(this.sharedState.createdAt)
        },100000)
    }

    getRequestWithWrongID() {
        test(`Fetching the data of that random SpcForm,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/12151`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['error'])
        },100000)
    }


    putRequestWrongParamaters () {
        const requestBody = {
            regulatingLaw: '152',
            companyLegalForm: 'nope'
        }

        test(`Updating the data of that random SpcForm with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            },100000)
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['error'])

        },100000)
    }

    putRequestWithWrongID () {
        const requestBody = {
            regulatingLaw: '152',
            companyLegalForm: 'nope'
        }

        test(`Updating the data of that random SpcForm with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/1215`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            },100000)
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['error'])

        },100000)
    }

    putRequestIndependently () {
        const requestBody = {
            regulatingLaw: '152',
            companyLegalForm: 'nope'
        }

        test(`Updating the data of that random SpcForm,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])

            const SpcFormElement = await SpcForm.findById(this.sharedState.id).exec()
            expect(SpcFormElement.status).toEqual('152')
            expect(SpcFormElement.investor).toEqual('no')

            this.sharedState.status = SpcFormElement.status
            this.sharedState.investor = SpcFormElement.investor
        },100000)
    }

    deleteRequestIndependently () {
        test(`Deleting that random SpcForm,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])
              
              const SpcFormElement = await SpcForm.findOne({_id: this.sharedState.id}).exec()
              expect(SpcFormElement).toEqual(null)
        })
    }
}
module.exports = SpcFormTest
