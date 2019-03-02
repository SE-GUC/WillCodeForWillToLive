
/** * npm modules ***/
const express = require('express')
const port = 3000

/** * project modules ***/
// example: const router = require('router/api/company')

const sscForm = require('./routes/api/sscForm')
const spcForm = require('./routes/api/spcForm')
const cases = require('./routes/api/cases');
const entityEmployeeRouter = require('./routes/api/EntityEmployee')
const external_entities=require('./routes/api/external_entities')
const companyRouter = require('./routes/api/company')
/** * global constants ***/


const app = express()
app.use(express.json());

/** * adding controllers/routers ***/
// example: app.use('/api/company', company)

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
/** * Listening on serverport ***/
app.listen(port, () => console.log(`Server up. Listening on port ${port}`))