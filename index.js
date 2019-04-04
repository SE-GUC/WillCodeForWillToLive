
/** * npm modules ***/
const express = require('express')
const mongoose = require('mongoose') //new
const port = process.env.PORT || 3000

/** * project modules ***/
// example: const router = require('router/api/company')

const reviewers = require('./routes/api/reviewer')
const tasks = require('./routes/api/task')
const investors = require('./routes/api/investor')
const form = require('./routes/api/form')

const externalEntitys = require('./routes/api/externalEntitys')
const cases = require('./routes/api/cases')
const adminRouter = require('./routes/api/admin')
const companyRouter = require('./routes/api/company')
const Lawyer = require('./routes/api/lawyer')
/** * global constants ***/
const app = express()

const db = require('./config/keys.js').mongoURI

mongoose
        .connect(db, {useNewUrlParser: true})
        .then(() => console.log('Connected to Database'))
        .catch(err => console.log(err))

app.use(express.json());


//new
// const db = require('./config/keys.js').mongoURI
// mongoose
//     .connect(db)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log(err))


/** * adding controllers/routers ***/
// example: app.use('/api/company', company)
//app.use('/api/Lawyer',Lawyer)

//
// /** * Connectiong to db ***/
// //const db = require('./config/keys.js').mongoURI
// mongoose.connect(db).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))


app.use('/api/Lawyer', Lawyer)
app.use('/api/reviewer', reviewers)

app.use('/api/task', tasks)
app.use('/api/investor', investors)
app.use('/api/company', companyRouter)
app.use('/api/externalEntitys', externalEntitys)
app.use('/api/form', form)
app.use('/api/cases', cases)
app.use('/api/admin', adminRouter)

/** * Adding temporary index page ***/
app.get('/', (req, res) => { res.send('<h1>WillCodeToLive</h1>\n<h3>Index Page<h3>') })
/** * Custom routing for wrong requests ***/
app.use((req, res) => {
  res.status(404).send({ err: 'Obi-Wan: You don\'t need to see this page...' })
})
/** * Listening on serverport ***/
app.listen(port, () => console.log(`Server up. Listening on port ${port}`))
