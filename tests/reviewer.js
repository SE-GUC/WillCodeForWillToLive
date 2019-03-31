const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Reviewer = require('../models/Reviewer')

class ReviewerTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
            id: null,
            username: null,
            password: null,
            name: null,
            birth_date: null,
            gender: null,
            nationallity: null,
            type_of_ID: null,
            mobile_number: null,
            fax_number: null,
            email: null,
            address: null
        }
    }
    runIndependently(){
        try{
            return new Promise((resolve, reject) => {
                describe('Making sure independent reviewer routes work',() =>{
                    this.postRequestWithMissingParameters()
                    this.postRequestIndependently()
                    this.getRequestIndependently()
                    this.getRequestToGetCases ()
                    this.getRequestToGetCasesForAReviewer()
                    this.putRequestWrongParamaters()
                    this.putRequestIndependently()
                    this.deleteRequestIndependently()
                    this.getTaskSortedByID()
                    this.getTaskSortedByCreationDate()
                })
                resolve()
            })
        }
        catch(error){

        }
    }

    postRequestWithMissingParameters() {
        const requestBody = {
            username: 'uniqueusername',
            password: 'password',
            birth_date: '12-05-1990',
            gender: 'Male',
            nationallity: 'Egyptian',
            type_of_ID: 'Basic',
            mobile_number: '3543542485',
            fax_number: '3546464',
            email: 'basic.b@gmail.com',
            address: 'address'
        }

        test(`Randomly creating a new reviewer with a missing parameter,\t\t[=> POST\t${this.base_url}\t`, async () => {
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
            username: 'uniqueusername',
            password: 'password',
            name: 'basicname',
            birth_date: '12-05-1990',
            gender: 'Male',
            nationallity: 'Egyptian',
            type_of_ID: 'Basic',
            mobile_number: '3543542485',
            fax_number: '3546464',
            email: 'basic.b@gmail.com',
            address: 'address'
        }

        test(`Randomly creating a new reviewer,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const reviewer = await Reviewer.findById(jsonResponse.data._id).exec()
              expect(reviewer).toMatchObject(requestBody)
              this.sharedState.id = reviewer._id
              this.sharedState.username = reviewer.username
              this.sharedState.password = reviewer.password
              this.sharedState.name = reviewer.name
              this.sharedState.birth_date = reviewer.birth_date
              this.sharedState.gender = reviewer.gender
              this.sharedState.nationallity = reviewer.nationallity
              this.sharedState.type_of_ID = reviewer.type_of_ID
              this.sharedState.mobile_number = reviewer.mobile_number
              this.sharedState.fax_number = reviewer.fax_number
              this.sharedState.email = reviewer.email
              this.sharedState.address = reviewer.address 

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
    getRequestToGetCasesForAReviewer () {

        test(`Fetching all the cases for that reviewer,\t[=> GET\t\t${this.base_url}/getCases/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/getCases/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])
        },100000)
    }

    getRequestToGetCasesForAReviewer () {

        test(`Fetching all the cases for that reviewer,\t[=> GET\t\t${this.base_url}/getCases/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/getCases/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])
        },100000)
    }

    getTaskSortedByID(){
        test(`Getting the tasks sorted by ID,\t[=> GET\t\t${this.base_url}/sortTaskByID\t`, async () => {
            const response = await nfetch(`${this.base_url}/sortTaskByID`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])
        },100000)
    }

    getTaskSortedByCreationDate(){
        test(`Getting the tasks sorted by ID,\t[=> GET\t\t${this.base_url}/sortTaskByCreationDate\t`, async () => {
            const response = await nfetch(`${this.base_url}/sortTaskByCreationDate`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])
        },100000)
    }

    getRequestIndependently () {

        test(`Fetching the data of that random reviewer,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            expect(jsonResponse.data.username).toEqual(this.sharedState.username)
            expect(jsonResponse.data.password).toEqual(this.sharedState.password)
            expect(jsonResponse.data.name).toEqual(this.sharedState.name)
            expect(jsonResponse.data.birth_date).toEqual(this.sharedState.birth_date)
            expect(jsonResponse.data.gender).toEqual(this.sharedState.gender)
            expect(jsonResponse.data.nationallity).toEqual(this.sharedState.nationallity)
            expect(jsonResponse.data.type_of_ID).toEqual(this.sharedState.type_of_ID)
            expect(jsonResponse.data.mobile_number).toEqual(this.sharedState.mobile_number)
            expect(jsonResponse.data.fax_number).toEqual(this.sharedState.fax_number)
            expect(jsonResponse.data.email).toEqual(this.sharedState.email)
            expect(jsonResponse.data.address).toEqual(this.sharedState.address)
        },100000)
    }

    putRequestWrongParamaters () {
        const requestBody = {
            gender: 1,
            nationallity: 'Egyptian',
            type_of_ID: 'Premium',
            email: 'basic1.b@gmail.com'
        }

        test(`Updating the data of that random reviewer with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['error'])

        },100000)
    }

    putRequestIndependently () {
        const requestBody = {
            gender: 'Female',
            nationallity: 'Egyptian',
            type_of_ID: 'Premium',
            email: 'basic1.b@gmail.com'
        }

        test(`Updating the data of that random reviewer,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            },100000)
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])

            const reviewer = await Reviewer.findById(jsonResponse.data._id).exec()
            expect(reviewer.gender).toEqual('Female')
            expect(reviewer.nationallity).toEqual('Egyptian')
            expect(reviewer.type_of_ID).toEqual('Premium')
            expect(reviewer.email).toEqual('basic1.b@gmail.com')

            this.sharedState.gender = reviewer.gender
            this.sharedState.nationallity = reviewer.nationallity
            this.sharedState.type_of_ID = reviewer.type_of_ID
            this.sharedState.email = reviewer.email

        })
    }

    deleteRequestIndependently () {
        test(`Deleting that random reviewer,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const reviewer = await Reviewer.findOne({_id: this.sharedState.id}).exec()
              expect(reviewer).toEqual(null)
        })
    }
}
module.exports = ReviewerTest 