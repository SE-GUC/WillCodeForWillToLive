/*** npm modules ***/
const express = require('express')
const mongoose= require('mongoose')
const bodyParser = require('body-parser');

const port = 3000



/*** project modules ***/
// example: const router = require('router/api/company')

/*** global constants ***/
const app = express()

// Connect to database
const uri = 'mongodb://sumerge-admin:7SbcKdJ4AAzovcvh@sumerge-shard-00-00-w9v07.mongodb.net:27017,sumerge-shard-00-01-w9v07.mongodb.net:27017,sumerge-shard-00-02-w9v07.mongodb.net:27017/sumerge-test?ssl=true&replicaSet=Sumerge-shard-0&authSource=admin&retryWrites=true'
const urisv = 'mongodb+srv://sumerge-admin:7SbcKdJ4AAzovcvh@sumerge-w9v07.mongodb.net/sumerge-db'
mongoose.connect(urisv, {dbName: 'sumerge-db', useNewUrlParser: true })

// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database')
})

// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error: ' + err)
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



var lawyerRoutes = require('./routes/lawyer.js')
app.use('/lawyer', lawyerRoutes)



/*** Adding temporary index page ***/
app.get('/', (req, res)=>{res.send("<h1>WillCodeToLive</h1>\n<h3>Index Page<h3>")})
/*** Custom routing for wrong requests ***/
app.use((req, res) => {
    res.status(404).send({err: 'Obi-Wan: You don\'t need to see this page...'})
})
/*** Listening on serverport ***/
app.listen(port, ()=>console.log(`Server up. Listening on port ${port}`))
