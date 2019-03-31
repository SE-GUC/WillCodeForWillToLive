const externalEntity = require('../models/ExternalEntity')
const nfetch = require('node-fetch')
class externalEntityTest {
  constructor (PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
    this.sharedState = {}
    this.runIndependently = this.runIndependently.bind(this)
    this.postRequestIndependently = this.postRequestIndependently.bind(this)
    this.getRequestIndependently = this.getRequestIndependently.bind(this)
    this.putRequestIndependently = this.putRequestIndependently.bind(this)
    this.deleteRequestIndependently = this.deleteRequestIndependently.bind(this)
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
  runIndependently () {
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure independent externalEntity routes work', () => {
          this.postRequestWithMissingParameters()
          this.postRequestIndependently()
          this.getRequestIndependently()
          this.getRequestWithWrongID()
          this.putRequestWrongParamaters()
          this.putRequestWithWrongID()
          this.putRequestIndependently()
          this.deleteRequestWrongID()
          this.deleteRequestIndependently()
        })
        resolve()
      })
    } catch (error) {

    }
  }
  postRequestWithMissingParameters () {
    const requestBody = {
      //name:'omar',
      emailAddress: 'omar@gmail.com',
      nationality: 'Egyption',
      typeofID: 'long',
      mobileNumber: 1234567890,
      faxNumber: 345634563,
      address: 'manyal cairo',
      username: 'omar123',
      password: 'omar123123'
    }

    test(`creating an externalEntity with no username,\t\t[=> POST\t${this.base_url}\t`, async (done) => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    
  }
  postRequestIndependently () {
  
    const requestBody = {
       name:'omar',
       emailAddress: 'omar@gmail.com',
       nationality: 'Egyption',
       typeofID: 'long',
       mobileNumber: 1234567890,
       faxNumber: 345634563,
       address: 'manyal cairo',
       username: 'omar123',
       password: 'omar123123'
    }

    test(`creating a new externalEntity,\t\t[=> POST\t${this.base_url}\t`, async (done) => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).not.toEqual(['error'])
      const externalEntityInstance = await ExternalEntity.findById(jsonResponse.data._id).exec()
      expect(externalEntityInstance).toMatchObject(requestBody)
      this.sharedState.id = externalEntityInstance._id
      this.sharedState.name = externalEntityInstance.name
      this.sharedState.emailAddress = externalEntityInstance.emailAddress
      this.sharedState.nationality = externalEntityInstance.nationality
      this.sharedState.typeofID = externalEntityInstance.typeofID
      this.sharedState.mobileNumber = externalEntityInstance.mobileNumber
      this.sharedState.faxNumber = externalEntityInstance.faxNumber
      this.sharedState.address = externalEntityInstance.address
      this.sharedState.username = externalEntityInstance.username
      this.sharedState.password = externalEntityInstance.password
    }, 100000)
  }
  getRequestIndependently () {
    test(`getting the externalEntity,\t[=> GET\t\t${this.base_url}/:id\t`, async (done) => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['data'])

      expect(jsonResponse.data.name).toEqual(this.sharedState.name)
      expect(jsonResponse.data.emailAddress).toEqual(this.sharedState.emailAddress)
      expect(jsonResponse.data.nationality).toEqual(this.sharedState.nationality)
      expect(jsonResponse.data.typeofID).toEqual(this.sharedState.typeofID)
      expect(jsonResponse.data.mobileNumber).toEqual(this.sharedState.mobileNumber)
      expect(jsonResponse.data.faxNumber).toEqual(this.sharedState.faxNumber)
      expect(jsonResponse.data.address).toEqual(this.sharedState.address)
      expect(jsonResponse.data.username).toEqual(this.sharedState.username)
      expect(jsonResponse.data.password).toEqual(this.sharedState.password)
    }, 100000)
  }
  getRequestWithWrongID () {
    test(`getting unexisting externalEntity,\t[=> GET\t\t${this.base_url}/:id\t`, async (done) => {
      const response = await nfetch(`${this.base_url}/13213`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
  }
  putRequestWrongParamaters () {
    const requestBody = {
      name: 11
    }
    test(`Updating externalEntity data with wrong name type,\t[=> PUT\t\t${this.base_url}/:id\t`, async (done) => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
  }
  putRequestWithWrongID () {
    const requestBody = {
      name: 'Sandler'
    }

    test(`Updating the data of an unexistent ExternalEntity,\t[=> PUT\t\t${this.base_url}/:id\t`, async (done) => {
      const response = await nfetch(`${this.base_url}/80085`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
  }
  putRequestIndependently () {
    const requestBody = {
        name:'omar',
        emailAddress: 'omar@gmail.com',
        nationality: 'Egyption',
        typeofID: 'long',
        mobileNumber: 1234567890,
        faxNumber: 345634563,
        address: 'manyal cairo',
        username: 'omar123',
        password: 'omar123123'
    }

    test(`Updating the data of the created externalEntity,\t[=> PUT\t\t${this.base_url}/:id\t`, async (done) => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])

      const externalEntityInstance = await ExternalEntity.findById(this.sharedState.id).exec()
      expect(externalEntityInstance).toMatchObject(requestBody)
      this.sharedState.name = externalEntityInstance.name
      this.sharedState.emailAddress = externalEntityInstance.emailAddress
      this.sharedState.nationality = externalEntityInstance.nationality
      this.sharedState.typeofID = externalEntityInstance.typeofID
      this.sharedState.mobileNumber = externalEntityInstance.mobileNumber
      this.sharedState.faxNumber = externalEntityInstance.faxNumber
      this.sharedState.address = externalEntityInstance.address
      this.sharedState.username = externalEntityInstance.username
      this.sharedState.password = externalEntityInstance.password
    }, 100000)
  }
  deleteRequestWrongID () {
    test(`Deleting unexistent externalEntity,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async (done) => {
      const response = await nfetch(`${this.base_url}/50000`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      const externalEntityInstance = await ExternalEntity.findOne({ _id: this.sharedState.id }).exec()
      expect(externalEntityInstance).not.toEqual(null)
    })
  }
  deleteRequestIndependently () {
    test(`Deleting that externalEntity,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async (done) => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])
      const externalEntityInstance = await ExternalEntity.findOne({ _id: this.sharedState.id }).exec()
      expect(externalEntityInstance).toEqual(null)
    })
  }
}
module.exports = externalEntityTest
