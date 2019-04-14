/** * npm modules ***/
const dotenv = require('dotenv')
dotenv.config() // Setting env variables
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

/** * project modules ***/
const reviewers = require('./routes/api/reviewer')
const tasks = require('./routes/api/task')
const investors = require('./routes/api/investor')
const form = require('./routes/api/form')
const formTemplate = require('./routes/api/formTemplate')
const externalEntitys = require('./routes/api/externalEntitys')
const cases = require('./routes/api/cases')
const adminRouter = require('./routes/api/admin')
const companyRouter = require('./routes/api/company')
const Lawyer = require('./routes/api/lawyer')

/** * global constants ***/
const app = express()
const db = process.env.mongoURI

mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//IMPORTANT!!!! DO NOT REMOVE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Adding routes
app.use('/api/Lawyer', Lawyer)
app.use('/api/reviewer', reviewers)
app.use('/api/task', tasks)
app.use('/api/investor', investors)
app.use('/api/company', companyRouter)
app.use('/api/externalEntitys', externalEntitys)
app.use('/api/form', form)
app.use('/api/cases', cases)
app.use('/api/admin', adminRouter)
app.use('/api/formTemplate', formTemplate)

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

/** * Adding temporary index page ***/
app.get('/', (req, res) => { res.send('<h1>WillCodeToLive</h1>\n<h3>Index Page<h3>') })
/** * Custom routing for wrong requests ***/
app.use((req, res) => {
  res.status(404).send({ error: 'Obi-Wan: You don\'t need to see this page...' })
})
/** * Listening on serverport ***/
app.listen(port, () => console.log(`Server up. Listening on port ${port}`))
