const mongoose = require('mongoose')
const reviewersTest = require('./tests/reviewer')
const casesTest = require('./tests/case')
const db = require('./config/keys.js').mongoURI

mongoose
        .connect(db)
        .then(() => console.log('Connected to Database'))
        .catch(err => console.log(err))

//beforeAll(async () => {
 //   await mongoose.connection.dropDatabase()
  //   })
          
 //afterAll(async () => {
  //   await mongoose.connection.dropDatabase()
   //  })

const reviewer = new reviewersTest(3000,'reviewer')
const cases = new casesTest(3000,'cases')


//describe('running independent test', () =>{
    Promise.all([cases.runIndependently()]).then(result => {})
    Promise.all([reviewer.runIndependently()]).then(result => {})
//})