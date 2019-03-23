
/** * npm modules ***/
const express = require('express')
const port =  3000
const mongoose = require('mongoose')

/** * project modules ***/
// example: const router = require('router/api/company')

const reviewers = require('./routes/api/reviewer')
const tasks = require('./routes/api/task')
const investors = require('./router/api/investors')
const sscForm = require('./routes/api/sscForm')
const spcForm = require('./routes/api/spcForm')
const cases = require('./routes/api/cases');
const entityEmployeeRouter = require('./routes/api/EntityEmployee')
const external_entities=require('./routes/api/external_entities')
const companyRouter = require('./routes/api/company')
const Lawyer = require('./routes/api/lawyer')
/** * global constants ***/
const app = express()

const db = require('./config/keys').mongoURI

mongoose
        .connect(db)
        .then(() => console.log('Connected to Database'))
        .catch(err => console.log(err))

app.use(express.json());


/** * adding controllers/routers ***/
// example: app.use('/api/company', company)

app.use('/api/Lawyer',Lawyer)
app.use('/api/reviewer', reviewers)
app.use('/api/tasks', tasks)/
app.use('/api/investors', investors)
app.use('/api/company', companyRouter)
app.use('/api/sscform',sscForm)
app.use('/api/spcform',spcForm)
app.use('/api/cases',cases);
app.use('/api/EntityEmployee', entityEmployeeRouter)
app.use('/api/ExternalEntity',external_entities)


/** * Adding temporary index page ***/
app.get('/', (req, res) => { res.send('<h1>WillCodeToLive</h1>\n<h3>Index Page<h3>') })
/** * Custom routing for wrong requests ***/
app.use((req, res) => {
  res.status(404).send({ err: 'Obi-Wan: You don\'t need to see this page...' })
})
/*** Listening on serverport ***/
app.listen(port, () => console.log(`Server up. Listening on port ${port}`))
