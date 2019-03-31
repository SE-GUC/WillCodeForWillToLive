const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Investor = require('./models/Investor')

class investorTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
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
                describe('Making sure independent reviewer routes work',() =>{
                    this.postRequestWithMissingParameters()
                    this.postRequestIndependently()
                    this.getRequestIndependently()
                    this.getRequestToGetCases ()
                    this.getRequestToGetCasesForAnInvestor()
                    this.putRequestWrongParamaters()
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
            email: "hadile@gmail.com",
            username: "araf",
            password: "whatever",
            typeOfID: "id",
            name: "liloo",
            nationality: "egyptian",
            capital: "12345678",
            DOB: "10-11-2000",
            mobileNumber: "0123456181",
            address: "whateverdfghj",
            faxNumber: "23456725672",
            gender: "Female"
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

    postRequestIndependently() {
        const requestBody = {
            email: "hadile@gmail.com",
            username: "araf",
            password: "whatever",
            typeOfID: "id",
            name: "liloo",
            nationality: "egyptian",
            capital: "12345678",
            DOB: "10-11-2000",
            mobileNumber: "0123456181",
            address: "whateverdfghj",
            faxNumber: "23456725672",
            gender: "Female"
        }

        test(`Randomly creating a new investor,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const investor= await Investor.findById(jsonResponse.data._id).exec()
              expect(investor).toMatchObject(requestBody)
              this.sharedState.id = investor._id
              this.sharedState.username = investor.username
              this.sharedState.password = investor.password
              this.sharedState.name = investor.name
              this.sharedState.birth_date = investor.birth_date
              this.sharedState.gender = investor.gender
              this.sharedState.nationallity =investor.nationality
              this.sharedState.type_of_ID = investor.type_of_ID
              this.sharedState.mobile_number = investor.mobile_number
              this.sharedState.fax_number = investor.fax_number
              this.sharedState.email = investor.email
              this.sharedState.address = investor.address 

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
    getRequestIndependently () {

        test(`Fetching the data of that random investor,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            expect(jsonResponse.data.username).toEqual(this.sharedState.username)
            expect(jsonResponse.data.password).toEqual(this.sharedState.password)
            expect(jsonResponse.data.name).toEqual(this.sharedState.name)
            expect(jsonResponse.data.DOB).toEqual(this.sharedState.DOB)
            expect(jsonResponse.data.gender).toEqual(this.sharedState.gender)
            expect(jsonResponse.data.nationality).toEqual(this.sharedState.nationality)
            expect(jsonResponse.data.typeOfID).toEqual(this.sharedState.typeOfID)
            expect(jsonResponse.data.mobileNumber).toEqual(this.sharedState.mobileNumber)
            expect(jsonResponse.data.faxNumber).toEqual(this.sharedState.faxNumber)
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

        test(`Updating the data of that random investor with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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

        test(`Updating the data of that random investor,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            },100000)
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])

            const investor = await Investor.findById(jsonResponse.data._id).exec()
            expect(investor.gender).toEqual('Female')
            expect(investor.nationallity).toEqual('Egyptian')
            expect(investor.type_of_ID).toEqual('Premium')
            expect(investor.email).toEqual('basic1.b@gmail.com')

            this.sharedState.gender = investor.gender
            this.sharedState.nationallity = investor.nationallity
            this.sharedState.type_of_ID = investor.type_of_ID
            this.sharedState.email = investor.email

        })
    }

    deleteRequestIndependently () {
        test(`Deleting that random investor,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const investor = await Investor.findOne({_id: this.sharedState.id}).exec()
              expect(investor).toEqual(null)
        })
    }
}
module.exports = InvestorTest 