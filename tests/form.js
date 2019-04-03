const Model = require('../models/Form')
const modelName = 'Form'
const nfetch = require('node-fetch')
const TIMEOUT = 100000

class SscTest {

  constructor(PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
    this.sharedState = {}
    this.runIndependently = this.runIndependently.bind(this)
    this.sharedState = {
      body: SscTest.createModelBody(1)
    }
    this.sharedState.body._id = null
  }

  runIndependently () {
    try {
      return new Promise((resolve, reject) => {
        describe(`Making sure independent ${modelName} routes work`, () => {
          this.postRequestWithMissingParameters()
          this.postRequestIndependently()
          this.getRequestIndependently()
          this.getRequestWithWrongID()
          this.putRequestWithWrongParameters()
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
    let reqBody = SscTest.createModelBody(null)
    delete reqBody.regulatingLaw
    test(`creating an ${modelName} with no regulating law`, async () => {
      const res = await nfetch(this.base_url, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {'Content-Type': 'application/json'}
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).toEqual(['error'])
    }, TIMEOUT)
  }

  postRequestIndependently() {
    const reqBody = SscTest.createModelBody(null)
    test(`Creating a new ${modelName}`, async () => {
      const res = await nfetch(this.base_url, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {'Content-Type': 'application/json'}
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).not.toEqual(['error'])
      const modelInstance = await Model.findById(jsonRes._id)
      expect(modelInstance).not.toBeNull()
      this.sharedState.body = jsonRes
    }, TIMEOUT)
  }

  getRequestIndependently() {
    test(`Getting one ${modelName} instance`, async () => {
      const res = await nfetch(`${this.base_url}/${this.sharedState.body._id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).not.toEqual(['error'])
    }, TIMEOUT)
  }

  getRequestWithWrongID () {
    test(`Try fetching a ${modelName} instance with an incorrect id`, async () => {
      const res = await nfetch(`${this.base_url}/-100`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).toEqual(['error'])
    }, TIMEOUT)
  }

  putRequestWithWrongParameters() {
    const reqBody = {
      companyLegalForm: 15
    }
    test(`Updating ${modelName} company legal form with the wrong data type`, async () => {
      const res = await nfetch(`${this.base_url}/${this.sharedState.body._id}`, {
        method: 'PUT',
        body: JSON.stringify(reqBody),
        headers: {'Content-Type': 'application/json'}
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).toEqual(['error'])
    }, TIMEOUT)
  }

  putRequestWithWrongID() {
    const reqBody = {
      companyLegalForm: 'SPC'
    }
    test(`Updating ${modelName} company legal form with the wrong data type`, async () => {
      const res = await nfetch(`${this.base_url}/-200`, {
        method: 'PUT',
        body: JSON.stringify(reqBody),
        headers: {'Content-Type': 'application/json'}
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).toEqual(['error'])
    }, TIMEOUT)
  }

  putRequestIndependently () {
    const reqBody = {
      companyNameArabic: 'NewNameArabic'
    }
    test(`Updating the data of the created ${modelName}`, async() => {
      const res = await nfetch(`${this.base_url}/${this.sharedState.body._id}`, {
        method: 'PUT',
        body: JSON.stringify(reqBody),
        headers: {'Content-Type': 'application/json'}
      })
      const jsonRes = res.json()
      expect(Object.keys(jsonRes)).not.toEqual(['error'])
      const modelInstance = await Model.findById(this.sharedState.body._id)
      expect(modelInstance.companyNameArabic).toEqual('NewNameArabic')
      this.sharedState.body = modelInstance
    }, TIMEOUT)
  }

  deleteRequestWrongID () {
    test(`Deleting an instance of ${modelName} with a wrong ID`, async () => {
      const res = await nfetch(`${this.base_url}/-102`, {
        method: 'DELETE'
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).toEqual(['error'])
      const modelInstance = await Model.findById(this.sharedState.body._id)
      expect(modelInstance).not.toEqual(null)
    })
  }

  deleteRequestIndependently() {
    test(`Deleting an instance of ${modelName}`, async() => {
      const res = await nfetch(`${this.base_url}/${this.sharedState.body._id}`, {
        method: 'DELETE'
      })
      const jsonRes = await res.json()
      expect(Object.keys(jsonRes)).not.toEqual(['error'])
      const modelInstance = await Model.findById(this.sharedState.body._id)
      expect(modelInstance).toEqual(null)
    })
  }

  static createModelBody (empty) {
    return {
      regulatingLaw: empty? null:'Law72',
      companyType: empty? null:'SSC',
      companyNameArabic: empty? null:'CompanyNameArabic',
      companyNameEnglish: empty? null:'CompanyNameEnglish',
      hqGovernorate: empty? null:'hqGov',
      hqCity: empty? null:'hqCity',
      hqTelephone: empty? null:'89127389124',
      hqFax: empty? null:'9012489124',
      capitalCurrency: empty? null:'EGP',
      capital: empty? null:90000,
      investorName: empty? null:'investorName',
      investorType: empty? null:'person',
      investorGender: empty? null:'male',
      investorNationality: empty? null:'Egyptian',
      investorIdType: empty? null:'nationalId',
      investorId: empty? null:'298190289012',
      investorBirthdate: empty? null:new Date('1-1-1990'),
      investorTelephone: empty? null:'1284789124',
      investorFax: empty? null:'124902094',
      investorEmail: empty? null:'investorEmail',
      investorAddress: empty? null:'investorPosition',
      boardOfDirectors: empty? null:[{
        directorName: 'Director1',
        directorType: 'person',
        directorGender: 'male',
        directorNationality: 'Egyptian',
        directorIdType: 'nationalId',
        directorId: '82374892374892734',
        directorBirthdate: new Date('1-1-1990'),
        directorAddress: 'directorAddress',
        directorPosition: 'directorPosition'
      }]
    }
  }
}

module.exports = SscTest