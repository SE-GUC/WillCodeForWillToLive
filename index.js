/*** npm modules ***/
const express = require('express')
const port = 3000
const mongoose = require('mongoose')

/*** project modules ***/
// example: const router = require('router/api/company')
const lawyer = require('./routes/api/lawyer')
/*** global constants ***/
const app = express()
app.use(express.json())

/*** adding controllers/routers ***/
// example: app.use('/api/company', company)
app.use('/api/Lawyer',lawyer)


/** * Connectiong to db ***/
const db = require('./config/keys.js').mongoURI
mongoose.connect(db).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

/*** Adding temporary index page ***/
app.get('/', (req, res)=>{res.send("<h1>WillCodeToLive</h1>\n<h3>Index Page<h3>")})
/*** Custom routing for wrong requests ***/
app.use((req, res) => {
    res.status(404).send({err: 'Obi-Wan: You don\'t need to see this page...'})
})
/*** Listening on serverport ***/
app.listen(port, ()=>console.log(`Server up. Listening on port ${port}`))
