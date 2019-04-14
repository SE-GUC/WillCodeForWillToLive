const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Case = require('../models/Case')

class CaseTest extends AbstractTests {
    constructor (PORT, ROUTE) {
        super(PORT, ROUTE)
        this.sharedState = {
            id: null,
            status: null,
            investor: null,
            reviewer: null,
            lawyer: null,
            company_name: null,
			reviewed_by_lawyer : null,
            reviewed_by_reviewer:null,
            fees: null,
            paid: null,
            currency: null,
            formID: null,
            priority: null,
            description: null,
            created_at: null,
            isDone: null,
            dueDate: null
        }
    }
    runIndependently(){
        try{
            return new Promise((resolve, reject) => {
                describe('Making sure independent cases routes work',() =>{
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
            status: 'pending',
            investor: 'investor',
            lawyer: 'lawyer',
            company_name: 'company',
			reviewed_by_lawyer : false,
			reviewed_by_reviewer:false
        }

        test(`Randomly creating a new case with a missing parameter,\t\t[=> POST\t${this.base_url}\t`, async () => {
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
            status: 'pending',
            investor: 'investor',
            reviewer: 'reviewer',
            lawyer: 'lawyer',
            company_name: 'company',
			reviewed_by_lawyer : false,
            reviewed_by_reviewer:false,
            fees: 50000,
            paid: false,
            currency: 'Sterling',
            priority: 'High',
            description: 'Financial Case',
            created_at: '2/1/2011',
            isDone: false,
            dueDate: '13/1/2011'
        }

        test(`Randomly creating a new case,\t\t[=> POST\t${this.base_url}\t`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
              })
              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).toEqual(['data'])

              const caseElement = await Case.findById(jsonResponse.data._id).exec()
              expect(caseElement).toMatchObject(requestBody)
              this.sharedState.id = caseElement._id
              this.sharedState.status = caseElement.status
              this.sharedState.investor = caseElement.investor
              this.sharedState.reviewer = caseElement.reviewer
              this.sharedState.lawyer = caseElement.lawyer
              this.sharedState.company_name = caseElement.company_name
              this.sharedState.reviewed_by_lawyer = caseElement.reviewed_by_lawyer
              this.sharedState.reviewed_by_reviewer = caseElement.reviewed_by_reviewer
              this.sharedState.priority = caseElement.priority
              this.sharedState.description = caseElement.description
              this.sharedState.created_at = caseElement.created_at
              this.sharedState.isDone = caseElement.isDone
              this.sharedState.dueDate = caseElement.dueDate
        },100000)
    }

    
    getRequestIndependently () {
        test(`Fetching the data of that random case,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'} 
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            expect(jsonResponse.data.status).toEqual(this.sharedState.status)
            expect(jsonResponse.data.investor).toEqual(this.sharedState.investor)
            expect(jsonResponse.data.reviewer).toEqual(this.sharedState.reviewer)
            expect(jsonResponse.data.lawyer).toEqual(this.sharedState.lawyer)
            expect(jsonResponse.data.company_name).toEqual( this.sharedState.company_name)
            expect(jsonResponse.data.reviewed_by_lawyer).toEqual(this.sharedState.reviewed_by_lawyer)
            expect(jsonResponse.data.reviewed_by_reviewer).toEqual(this.sharedState.reviewed_by_reviewer)
            expect(jsonResponse.data.fees).toEqual(this.sharedState.fees)
            expect(jsonResponse.data.paid).toEqual(this.sharedState.paid)
            expect(jsonResponse.data.currency).toEqual(this.sharedState.currency)
            expect(jsonResponse.data.formID).toEqual(this.sharedState.formID)
            expect(jsonResponse.data.priority).toEqual(this.sharedState.priority)
            expect(jsonResponse.data.description).toEqual(this.sharedState.description)
            expect(jsonResponse.data.created_at).toEqual(this.sharedState.created_at)
            expect(jsonResponse.data.isDone).toEqual(this.sharedState.isDone)
            expect(jsonResponse.data.dueDate).toEqual(this.sharedState.dueDate)
        },100000)
    }

    getRequestWithWrongID() {
        test(`Fetching the data of that random case,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
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
            status: 152,
            investor: 'investor1'
        }

        test(`Updating the data of that random case with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
            status: 'approved',
            investor: 'investor1'
        }

        test(`Updating the data of that random case with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
            status: 'approved',
            investor: 'investor1'
        }

        test(`Updating the data of that random case,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`,{
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])

            const caseElement = await Case.findById(this.sharedState.id).exec()
            expect(caseElement.status).toEqual('approved')
            expect(caseElement.investor).toEqual('investor1')

            this.sharedState.status = caseElement.status
            this.sharedState.investor = caseElement.investor
        },100000)
    }

    deleteRequestIndependently () {
        test(`Deleting that random case,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },100000)
              const jsonResponse = await response.json()
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])
              
              const caseElement = await Case.findOne({_id: this.sharedState.id}).exec()
              expect(caseElement).toEqual(null)
        })
    }
}
module.exports = CaseTest
