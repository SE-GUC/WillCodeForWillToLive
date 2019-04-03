const nfetch = require('node-fetch')
const AbstractTests = require('../tests/AbstractTests.js')
const Investor = require('../models/investor.js')

class investorTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
            id: null, 
            email: null,
            username: null,
            password: null,
            TypeOfId: null,
            name: null,
            nationality: null,
            capital: null,
            DOB: null,
            mobileNumber: null,
            Address: null,
            faxNumber: null,
            gender: null
        }
    }
    runIndependently(){
        try{
            return new Promise((resolve, reject) => {
                describe('Making sure independent investor routes work',() =>{
                    this.postRequestWithMissingParameters()
                    this.postRequestIndependently()
                    this.getRequestIndependently()
                    this.getRequestWithWrongID()
                    this.putRequestWrongParamaters()
                    this.putRequestWithWrongID()
                    this.putRequestIndependently()
                    this.deleteRequestIndependently()
                    this.getRequestToGetCases()


                })
                resolve()
            })
        }
        catch(error){

        }
    }

    postRequestWithMissingParameters() {
        const requestBody = {
          email: 'whatever@gsgduy.v',
          //username: null,
          password: '3456udgus',
          typeOfID: 'id',
          name: 'hadile',
          nationality: 'French',
          capital: 134562,
          //DOB: null,
          mobileNumber: 35627,
          Address: 'gsjsy6',
          faxNumber: 16527,
          
        }

        test(`Randomly creating a new investor with a missing parameter,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).toEqual(['error'])
        },100000)
    }
    getRequestToGetCases () {

        test(`Fetching all the cases available,\t[=> GET\t\t${this.base_url}/getCases/\t`, async () => {
            const response = await nfetch(`${this.base_url}/getCases/`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])
        },100000)
    }

    getRequestToGetCasesForAnInvestor () {

        test(`Fetching all the cases for that investor,\t[=> GET\t\t${this.base_url}/getCases/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/getCases/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])
        },100000)
    }


    postRequestIndependently() {
        const requestBody = {
            email: 'whatever@gsgduy.v',
            username: "hadilee",
            password: '3456udgus',
            typeOfID: 'id',
            name: 'hadile',
            nationality: 'French',
            capital: 134562,
            //DOB: 10-11-1997,
            mobileNumber: 35627,
            address: 'gsjsy6',
            faxNumber: 16527,
            gender: 'Female'
        }

        test(`Randomly creating a new investor ,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()
              console.log(jsonResponse)
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const investorElement = await Investor.findById(jsonResponse.data._id).exec()
              expect(investorElement).toMatchObject(requestBody)
              this.sharedState.id = investorElement._id
              this.sharedState.email = investorElement.email
              this.sharedState.username = investorElement.username
              this.sharedState.password = investorElement.password
              this.sharedState.typeOfID = investorElement.typeOfID
              this.sharedState.name = investorElement.name
              this.sharedState.nationality = investorElement.nationality
              this.sharedState.DOB = investorElement.DOB
              this.sharedState.mobileNumber = investorElement.mobileNumber
              this.sharedState.gender = investorElement.gender
              this.sharedState.faxNumber = investorElement.faxNumber
              this.sharedState.address = investorElement.address
        },100000)
    }


    getRequestIndependently () {
        test(`Fetching the data of that random investor,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(["data"])

            expect(jsonResponse.data.name).toEqual(this.sharedState.name)
            expect(jsonResponse.data.DOB).toEqual(this.sharedState.DOB)
            expect(jsonResponse.data.gender).toEqual(this.sharedState.gender)
            expect(jsonResponse.data.nationality).toEqual(this.sharedState.nationality)
            expect(jsonResponse.data.typeOfID).toEqual( this.sharedState.typeOfID)
            expect(jsonResponse.data.mobileNumber).toEqual(this.sharedState.mobileNumber)
            expect(jsonResponse.data.faxNumber).toEqual(this.sharedState.faxNumber)
            expect(jsonResponse.data.email).toEqual(this.sharedState.email)
            expect(jsonResponse.data.username).toEqual(this.sharedState.username)
            expect(jsonResponse.data.password).toEqual(this.sharedState.password)

        },100000)
    }

    getRequestWithWrongID() {
        test(`Fetching the data of that random investor,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/12151`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['msg'])
        },100000)
    }


    putRequestWrongParamaters () {
        const requestBody = {
          gender: 1,
          nationality: 'French',
        }

        test(`Updating the data of that random investor with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
          gender: 'Female',
          nationality: 'French',
        }

        test(`Updating the data of that random investor with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/1215`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            },100000)
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['msg'])

        },100000)
    }

    putRequestIndependently () {
        const requestBody = {
          gender: 'Female',
          nationality: 'French',
        }

        test(`Updating the data of that random investor,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])
            const investorElement = await Investor.findById(this.sharedState.id).exec()
            expect( investorElement.gender ).toEqual('Female')
            expect( investorElement.nationality ).toEqual('French')
            this.sharedState.gender = investorElement.gender
            this.sharedState.nationality = investorElement.nationality
        },100000)
    }

    deleteRequestIndependently () {
        test(`Deleting that random investor,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const investorElement = await Investor.findOne({_id: this.sharedState.id}).exec()
              expect(investorElement).toEqual(null)
        })
    }
}
module.exports = investorTest