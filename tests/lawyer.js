const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Lawyer = require('../models/lawyer')

class LawyerTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
          id : null,
          name: null,
          birth_date: null,
          gender: null,
          nationality: null,
          typeOfID: null,
          mobile_number: null,
          fax_number: null,
          email_address: null,
          // username: null,
          password: null,
        }
    }
    runIndependently(){
        try{
            return new Promise((resolve, reject) => {
                describe('Making sure independent lawyer routes work',() =>{
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
          name: "Test_name",
          // birth_date: null,
          gender: "Test_gender",
          nationality: "Test_nationality",
          typeOfID: "Test_typeOfID",
          mobile_number: "25109920",
          fax_number: 2000,
          email_address: "Test_email_address",
          // username: "Test_username",
          password: "Test_password",
        }

        test(`Randomly creating a new lawyer with a missing parameter,\t\t[=> POST\t${this.base_url}\t`, async () => {
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
          name: "Test_name",
          birth_date: 2000,
          gender: "Test_gender",
          nationality: "Test_nationality",
          typeOfID: "Test_typeOfID",
          mobile_number: "25109920",
          fax_number: 2000,
          email_address: "Test_email_address",
            // username: "Test_username",
          password: "Test_password",
        }

        test(`Randomly creating a new lawyer,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()
              console.log(jsonResponse)
              expect(Object.keys(jsonResponse)).toEqual(['data'])

              const lawyerElement = await Lawyer.findById(jsonResponse.data._id).exec()
              expect(lawyerElement).toMatchObject(requestBody)
              this.sharedState.id = lawyerElement._id
              this.sharedState.name = lawyerElement.name
              this.sharedState.birth_date = lawyerElement.birth_date
              this.sharedState.gender = lawyerElement.gender
              this.sharedState.nationality = lawyerElement.nationality
              this.sharedState.typeOfID = lawyerElement.typeOfID
              this.sharedState.mobile_number = lawyerElement.mobile_number
              this.sharedState.fax_number = lawyerElement.fax_number
              this.sharedState.email_address = lawyerElement.email_address
              // this.sharedState.username = lawyerElement.username
              this.sharedState.password = lawyerElement.password
        },100000)
    }


    getRequestIndependently () {
        test(`Fetching the data of that random lawyer,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            expect(jsonResponse.data.name).toEqual(this.sharedState.name)
            expect(jsonResponse.data.birth_date).toEqual(this.sharedState.birth_date)
            expect(jsonResponse.data.gender).toEqual(this.sharedState.gender)
            expect(jsonResponse.data.nationality).toEqual(this.sharedState.nationality)
            expect(jsonResponse.data.typeOfID).toEqual( this.sharedState.typeOfID)
            expect(jsonResponse.data.mobile_number).toEqual(this.sharedState.mobile_number)
            expect(jsonResponse.data.fax_number).toEqual(this.sharedState.fax_number)
            expect(jsonResponse.data.email_address).toEqual(this.sharedState.email_address)
              // expect(jsonResponse.data.username).toEqual(this.sharedState.username)
            expect(jsonResponse.data.password).toEqual(this.sharedState.password)

        },100000)
    }

    getRequestWithWrongID() {
        test(`Fetching the data of that random lawyer,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
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
          gender: 1,
          nationality: 'French',
        }

        test(`Updating the data of that random lawyer with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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

        test(`Updating the data of that random lawyer with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
          gender: 'Female',
          nationality: 'French',
        }

        test(`Updating the data of that random lawyer,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])

            const lawyerElement = await Lawyer.findById(this.sharedState.id).exec()
            expect(lawyerElement.gender).toEqual('Female')
            expect(lawyerElement.nationality).toEqual('French')

            this.sharedState.gender = lawyerElement.gender
            this.sharedState.nationality = lawyerElement.nationality
        },100000)
    }

    deleteRequestIndependently () {
        test(`Deleting that random lawyer,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const lawyerElement = await Lawyer.findOne({_id: this.sharedState.id}).exec()
              expect(lawyerElement).toEqual(null)
        })
    }
}
module.exports = LawyerTest
