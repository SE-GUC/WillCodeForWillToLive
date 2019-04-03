const Task = require("../models/Task")
const AbstractTests = require("./AbstractTests")
const nfetch = require('node-fetch')

class TasksTest extends AbstractTests{
    constructor(PORT,ROUTE){
        super(PORT, ROUTE)
        this.sharedState = {
            priority: null,
            description: null,
            created_at: null,
            isDone: null,
            dueDate: null,
            assignee: null
        }
    }

    runIndependently () {
       // super.runIndependently()
        try {
          return new Promise((resolve, reject) => {
            describe('Making sure independent task routes work', () => {
              this.postRequestIndependently()
              this.postRequestWithMissingParams()
              this.postRequestWithWrongType()
              this.getRequestIndependently()
              this.getRequestWithNotFoundID()
              this.putRequestIndependently()
            //  this.putRequestWithNotFoundID()
              this.putRequestWithWrongType()
              this.putRequestWithMissingParams()
              this.deleteRequestIndependently()
            //  this.deleteRequestWithNotFoundID()
            })
            resolve()
          })
        } catch (err) {}
      }
    
      postRequestWithMissingParams(){
          const reqBody = {
              priority: 'High',
              description: 'Task description 1',
              created_at: '1/3/2001',
          }

          test(`Create a new task with missing parameters, \t\t[=> POST\t${this.base_url}\t]`, async () => {
              const response = await nfetch(`${this.base_url}`, {
                  method: 'POST',
                  body: JSON.stringify(reqBody),
                  headers: {'Content-Type': 'application/json'}
              })

              const jsonResponse = await response.json()
              
              expect(Object.keys(jsonResponse)).toEqual(['error'])
          })
      }

      postRequestWithWrongType(){
          const reqBody = {
            priority: 1, 
            description: 'Task description 1',
            created_at: '1/3/2001',
            isDone: false,
            dueDate: '5/3/2001',
            assignee: 'Joey' 
          }

          test(`Create a new task with wrong type parameters, \t\t[=> POST\t${this.base_url}\t]`, async () => {
            const response = await nfetch(`${this.base_url}`, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {'Content-Type': 'application/json'}
            })

            const jsonResponse = await response.json()
            
            expect(Object.keys(jsonResponse)).toEqual(['error'])
        })

      }

      postRequestIndependently(){
          console.log ('Entered postRequestIndependently')
          const reqBody = {
              priority: 'High', 
              description: 'Task description 1',
              created_at: '1/3/2001',
              isDone: false,
              dueDate: '5/3/2001',
              assignee: 'Joey' 
          }

          test(`Create a new task, \t\t[=> POST\t${this.base_url}\t`, async () => {
              const response = await nfetch(`${this.base_url}`, {
                  method: 'POST',
                  body: JSON.stringify(reqBody),
                  headers: {'Content-Type': 'application/json' }
              })

              const jsonResponse = await response.json()
              console.log({data: jsonResponse})

              expect(Object.keys(jsonResponse)).toEqual(['msg', 'data'])
              expect(Object.keys(jsonResponse)).not.toEqual(['error'])

              const taskaya = await Task.findById(jsonResponse.data._id)
              expect(taskaya).toMatchObject(reqBody)
              this.sharedState.id = taskaya._id
              this.sharedState.priority = taskaya.priority
              this.sharedState.description = taskaya.description
              this.sharedState.created_at = taskaya.created_at
              this.sharedState.isDone = taskaya.isDone
              this.sharedState.dueDate = taskaya.dueDate
              this.sharedState.assignee = taskaya.assignee
          }, 100000)
      }

      getRequestWithNotFoundID(){
          test(`Get task with not defined ID, \t[=> GET\t\t${this.base_url}/:id\t]`, async () => {
              const response = await nfetch(`${this.base_url}/abcd`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              }, 100000)

              const jsonResponse = await response.json()

              expect(Object.keys(jsonResponse)).toEqual(['error'])
          })
      }

      getRequestIndependently () {
        test(`Get tasks, \t[=> GET\t\t${this.base_url}/:id\t`, async () => {
          const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }, 100000)
          const jsonResponse = await response.json()
          expect(Object.keys(jsonResponse)).toEqual(['data'])
          expect(Object.keys(jsonResponse)).not.toEqual(['error'])
    
          expect(jsonResponse.data.priority).toEqual(this.sharedState.priority)
          expect(jsonResponse.data.description).toEqual(this.sharedState.description)
          expect(jsonResponse.data.created_at).toEqual(this.sharedState.created_at)
          expect(jsonResponse.data.isDone).toEqual(this.sharedState.isDone)
          expect((jsonResponse.data.dueDate)).toEqual(this.sharedState.dueDate)
          expect(jsonResponse.data.assignee).toEqual(this.sharedState.assignee)
        })
      }

     /* putRequestWithNotFoundID (){
          const reqBody = {
            priority: 'Medium',
            description: 'Task 1 description updated',
            created_at: '5/3/2001',
            isDone: true,
            dueDate: '6/3/2001',
            assignee: "Loki"
          }

          test(`Update task with not defined ID,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/abcd`, {
              method: 'PUT',
              body: JSON.stringify(reqBody),
              headers: { 'Content-Type': 'application/json' }
            }, 100000)
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(['error'])

      }, 10000)
    }*/

    putRequestWithWrongType(){
        const reqBody = {
            priority: 1,
            description: 'Task 1 description updated',
            created_at: '5/3/2001',
            isDone: true,
            dueDate: '6/3/2001',
            assignee: "Loki"
          }
          test(`Update task with wrong type of parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
              method: 'PUT',
              body: JSON.stringify(reqBody),
              headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['error'])
          }, 100000)
    }

    putRequestWithMissingParams(){
        const reqBody = {
            priority: 'Medium',
            description: 'Task 1 description updated',
            created_at: '5/3/2001',
          }
          test(`Update task with missing parameters,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
            const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
              method: 'PUT',
              body: JSON.stringify(reqBody),
              headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            expect(Object.keys(jsonResponse)).toEqual(['msg', 'data'])
            expect(Object.keys(jsonResponse)).not.toEqual(['error'])
      
            const taskaya = await Task.findById(this.sharedState.id)
            
            // this.sharedState.id = taskaya._id
            // this.sharedState.priority = taskaya.priority
            // this.sharedState.description = taskaya.description
            // this.sharedState.created_at = taskaya.created_at

            // expect(jsonResponse.data.priority).toEqual(this.sharedState.priority)
            // expect(jsonResponse.data.description).toEqual(this.sharedState.description)
            // expect(jsonResponse.data.created_at).toEqual(this.sharedState.created_at)
  
             
          }, 100000)
    }

      putRequestIndependently () {
        const reqBody = {
          priority: 'Medium',
          description: 'Task 1 description updated',
          created_at: '5/3/2001',
          isDone: true,
          dueDate: '6/3/2001',
          assignee: "Loki"
        }
        test(`Update task,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
          const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
            method: 'PUT',
            body: JSON.stringify(reqBody),
            headers: { 'Content-Type': 'application/json' }
          })
          const jsonResponse = await response.json()
          expect(Object.keys(jsonResponse)).toEqual(['msg', 'data'])
          expect(Object.keys(jsonResponse)).not.toEqual(['error'])
    
          const taskaya = await Task.findById(this.sharedState.id)
          
          expect(jsonResponse.data.priority).toEqual(this.sharedState.priority)
          expect(jsonResponse.data.description).toEqual(this.sharedState.description)
          expect(jsonResponse.data.created_at).toEqual(this.sharedState.created_at)
          expect(jsonResponse.data.isDone).toEqual(this.sharedState.isDone)
          expect(jsonResponse.data.dueDate).toEqual(this.sharedState.dueDate)
          expect(jsonResponse.data.assignee).toEqual(this.sharedState.assignee)

           this.sharedState.id = taskaya._id
           this.sharedState.priority = taskaya.priority
           this.sharedState.description = taskaya.description
           this.sharedState.created_at = taskaya.created_at
           this.sharedState.isDone = taskaya.isDone
           this.sharedState.dueDate = taskaya.dueDate
           this.sharedState.assignee = taskaya.assignee
        }, 100000)
      }

      /*deleteRequestWithNotFoundID(){
          test(`Deleting task with not found ID, \t[=> DELETE\t${this.base_url}/:id\t]`, async () => {
            const response = await nfetch(`${this.base_url}/abcd`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              },5000)
              const jsonResponse = await response.json()
              
              expect(Object.keys(jsonResponse)).toEqual(['error'])
          }, 10000)
      }*/
      
      deleteRequestIndependently () {
        test(`Deleting task,\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
          const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          },100000)
          const jsonResponse = await response.json()
          
          expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
          expect(Object.keys(jsonResponse)).not.toEqual(['error'])
    
          const taskaya = await Task.findById({ _id: this.sharedState.id }).exec()
          expect(taskaya).toEqual(null)
        })
      }
}

module.exports = TasksTest