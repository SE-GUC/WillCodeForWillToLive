const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const externalEntity = require('../models/ExternalEntity')

class externalEntityTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
          id: null,
          name:null,
          emailAddress: null,
          nationality: null,
          typeofID: null,
          mobileNumber: null,
          faxNumber: null,
          address: null,
          username: null,
          password: null
        }
    }
    runIndependently(){
        try{
            return new Promise((resolve, reject) => {
                describe('Making sure independent externalEntitys routes work',() =>{
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
          //name:'omar',
          emailAddress: 'omar123@gmail.com',
          nationality: 'Egyption',
          typeofID: 'long',
          mobileNumber: 23452342,
          faxNumber: 634563456,
          address: 'Cairo',
          username: 'omar123',
          password: 'omaromar'
        }

        test(`Randomly creating a new externalEntity with a missing parameter,\t\t[=> POST\t${this.base_url}\t`, async () => {
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
          name:'omar',
          emailAddress: 'omar123@gmail.com',
          nationality: 'Egyption',
          typeofID: 'long',
          mobileNumber: 23452342,
          faxNumber: 634563456,
          address: 'Cairo',
          username: 'omar123',
          password: 'omaromar'
        }

        test(`Randomly creating an externalEntity \t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).toEqual(['data'])

              const externalEntityElement = await externalEntity.findById(jsonResponse.data._id).exec()
              expect(externalEntityElement).toMatchObject(requestBody)
              this.sharedState.id = externalEntityElement._id
              this.sharedState.name = externalEntityElement.name
              this.sharedState.emailAddress = externalEntityElement.emailAddress
              this.sharedState.nationality = externalEntityElement.nationality
              this.sharedState.typeofID = externalEntityElement.typeofID
              this.sharedState.mobileNumber = externalEntityElement.mobileNumber
              this.sharedState.faxNumber = externalEntityElement.faxNumber
              this.sharedState.address= externalEntityElement.address
              this.sharedState.username= externalEntityElement.username
              this.sharedState.password= externalEntityElement.password
        },100000)
    }

    
    getRequestIndependently () {
        test(`Fetching the data of that random externalEntity,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            expect(jsonResponse.data.name).toEqual(this.sharedState.name)
            expect(jsonResponse.data.emailAddress).toEqual(this.sharedState.emailAddress)
            expect(jsonResponse.data.nationality).toEqual(this.sharedState.nationality)
            expect(jsonResponse.data.typeofID).toEqual(this.sharedState.typeofID)
            expect(jsonResponse.data.mobileNumber).toEqual( this.sharedState.mobileNumber)
            expect(jsonResponse.data.faxNumber).toEqual(this.sharedState.faxNumber)
            expect(jsonResponse.data.address).toEqual(this.sharedState.address)
            expect(jsonResponse.data.username).toEqual(this.sharedState.username)
            expect(jsonResponse.data.password).toEqual(this.sharedState.password)
        },100000)
    }

    getRequestWithWrongID() {
        test(`Fetching the data of that random externalEntity with wrong id,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
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
          mobileNumber: 'ahmed',
          username: 3456345
        }

        test(`Updating the data of that random externalEntity with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
            name:'omar1',
            nationality:'american'
        }

        test(`Updating the data of that random externalEntity with wrong id,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/1213235`,{
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
          name:'omar1',
          nationality:'american'
        }

        test(`Updating the data of that random externalEntity,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])

            const externalEntityElement = await externalEntity.findById(this.sharedState.id).exec()
            expect(externalEntityElement.name).toEqual('omar1')
            expect(externalEntityElement.nationality).toEqual('american')

            this.sharedState.name = externalEntityElement.name
            this.sharedState.nationality = externalEntityElement.nationality
        },100000)
    }

    deleteRequestIndependently () {
        test(`Deleting that random externalEntity,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])
              
              const externalEntityElement = await externalEntity.findOne({_id: this.sharedState.id}).exec()
              expect(externalEntityElement).toEqual(null)
        })
    }
}
module.exports = externalEntityTest
