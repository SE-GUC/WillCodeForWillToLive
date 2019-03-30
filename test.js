const mongoose = require('mongoose')
const reviewersTest = require('./tests/reviewer')
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

//describe('running independent test', () =>{
    Promise.all([reviewer.runIndependently()]).then(result => {})
//})