const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Company = require('../models/Company')

class CompanyTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
            id:null,
            CompanyName: null,
            CompanyType: null,
            EstablishmentDate: null,
            InvestorName: null,
            InvestorId: null,
            Capital: null,
			RegulatingLaw : null,
            CompanyLegalForm :null,
            Governorate: null,
            City: null,
            Address: null,
            Telephone: null,
            Fax: null
        }
    }
    runIndependently(){
        try{
            return new Promise((resolve, reject) => {
                describe('Making sure independent company routes work',() =>{
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
            CompanyName: 'abbys',
            CompanyType: 'Spc',
            EstablishmentDate: '8-7-1970',
            InvestorName: 'investor',
            InvestorId: '1020392039023',
            Capital: 800000,
			RegulatingLaw : 'LAW72',
            CompanyLegalForm :'LegalForm',
            Governorate: 'Giza',
            City: 'Cairo',
            Address: '1977streetbla',
            Telephone: '23309392039',
            Fax: 'gdsf3e2839429'      

        }

        test(`Randomly creating a new Company with a missing parameter,\t\t[=> POST\t${this.base_url}\t`, async () => {
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
            CompanyName: 'abbys',
            CompanyType: 'Spc',
            EstablishmentDate: '8-7-1970',
            InvestorName: 'investor',
            InvestorId: '1020392039023',
            Capital: 800000,
			RegulatingLaw : 'LAW72',
            CompanyLegalForm :'LegalForm',
            Governorate: 'Giza',
            City: 'Cairo',
            Address: '1977streetbla',
            Telephone: '23309392',
            Fax: 'gdsf3e28'
        }

        test(`Randomly creating a new Company,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).toEqual(['data'])

              const companyElement = await Company.findById(jsonResponse.data._id).exec()
              expect(companyElement).toMatchObject(requestBody)
              this.sharedState.id = companyElement._id
              this.sharedState.CompanyName = companyElement.CompanyName
              this.sharedState.CompanyType = companyElement.CompanyType
              this.sharedState.EstablishmentDate = companyElement.EstablishmentDate
              this.sharedState.InvestorName = companyElement.InvestorName
              this.sharedState.InvestorId = companyElement.InvestorId
              this.sharedState.Capital = companyElement.Capital
              this.sharedState.RegulatingLaw = companyElement.RegulatingLaw
              this.sharedState.CompanyLegalForm = companyElement.CompanyLegalForm 
              this.sharedState.Governorate = companyElement.Governorate
              this.sharedState.City = companyElement.City
              this.sharedState.Address = companyElement.Address
              this.sharedState.Telephone = companyElement.Telephone
              this.sharedState.Fax = companyElement.Fax
        },100000)
    }

    
    getRequestIndependently () {
        test(`Fetching the data of that random company,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            expect(jsonResponse.data.CompanyName).toEqual(this.sharedState.CompanyName)
            expect(jsonResponse.data.CompanyType).toEqual(this.sharedState.CompanyType)
            expect(jsonResponse.data.EstablishmentDate).toEqual(this.sharedState.EstablishmentDate)
            expect(jsonResponse.data.InvestorName).toEqual(this.sharedState.InvestorName)
            expect(jsonResponse.data.InvestorId).toEqual( this.sharedState.InvestorId)
            expect(jsonResponse.data.Capital).toEqual(this.sharedState.Capital)
            expect(jsonResponse.data.RegulatingLaw).toEqual(this.sharedState.RegulatingLaw)
            expect(jsonResponse.data.CompanyLegalForm).toEqual(this.sharedState.CompanyLegalForm)
            expect(jsonResponse.data.Governorate).toEqual(this.sharedState.Governorate)
            expect(jsonResponse.data.City).toEqual(this.sharedState.City)
            expect(jsonResponse.data.Address).toEqual(this.sharedState.Address)
            expect(jsonResponse.data.Telephone).toEqual(this.sharedState.Telephone)
            expect(jsonResponse.data.Fax).toEqual(this.sharedState.Fax)
        },100000)
    }

    getRequestWithWrongID() {
        test(`Fetching the data of that random company,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
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
            CompanyName: 882,
            CompanyType: 'Spc'
        }

        test(`Updating the data of that random company with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
            CompanyName: 'abbys',
            CompanyType: 'Spc'
        }

        test(`Updating the data of that random company with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
            CompanyName: 'abbys',
            CompanyType: 'Spc'
        }

        test(`Updating the data of that random company\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])

            const companyElement = await Company.findById(this.sharedState.id).exec()
            expect(companyElement.CompanyName).toEqual('abbys')
            expect(companyElement.CompanyType).toEqual('Spc')

            this.sharedState.CompanyName = companyElement.CompanyName
            this.sharedState.CompanyType = companyElement.CompanyType
        },100000)
    }

    deleteRequestIndependently () {
        test(`Deleting that random company,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])
              
              const companyElement = await Company.findOne({_id: this.sharedState.id}).exec()
              expect(companyElement).toEqual(null)
        })
    }
}
module.exports = CompanyTest
