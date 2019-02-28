/*** npm modules ***/
const express = require('express')
const port = 3000

/*** project modules ***/
// example: const router = require('router/api/company')

/*** global constants ***/
const app = express()

/*** adding controllers/routers ***/
// example: app.use('/api/company', company)


/*** Adding temporary index page ***/
app.get('/', (req, res)=>{res.send("<h1>WillCodeToLive</h1>\n<h3>Index Page<h3>")})
/*** Custom routing for wrong requests ***/
app.use((req, res) => {
    res.status(404).send({err: 'Obi-Wan: You don\'t need to see this page...'})
})
/*** Listening on serverport ***/
app.listen(port, ()=>console.log(`Server up. Listening on port ${port}`))