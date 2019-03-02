// Reuired npm modules
const express = require("express")
const bodyParser = require("body-parser")
const joi = require("joi")
// Required model modules
const Company = require('../../models/Company')

// Create a list to mimic a data source
const dataSource = [
    new Company('Company1', new Date().now(), 'Inv1', 'Running'),
    new Company('Company2', new Date().now(), 'Inv2', 'Dead')
] 

// Initializing router and adding body-parser function
const router = express.Router()
router.use(bodyParser.json())

/*** CRUD implementation ***/
// Creating new data
router.post('/', (req, res)=>{
    let schema = Company.schema
    let val = joi.validate(req.body, schema)
    if(val.error){
        return res.sendStatus(400)
    }
    let newCompany = new Company(req.body.companyName,
        req.body.establishmentDate, req.body.investorName, req.body.companyStatus)
    // Add new data to the list
    dataSource.push(newCompany)
    return res.send("Company added!")
})

// Show all data
router.get('/', (req, res)=>{
    res.send(dataSource)
})

// Reading entry
router.get('/:uuid', (req, res)=>{
    let uuid = req.params.uuid
    let company = dataSource.find(x => x.uuid == uuid)
    // Company not found
    if(!company){
        return res.sendStatus(400)
    }
    res.send(`${company.companyName}\n${company.investorName}`)
})

// Updating
router.put('/:uuid', (req, res)=>{
    let uuid = req.params.uuid
    let company = dataSource.find(x => x.uuid == uuid)
    // Company not found
    if(company === undefined){
        return res.sendStatus(400)
    }
    let schema = Company.schema
    for(attr in company){
        if(attr in req.body && req.body[attr] != ''){
            let val = joi.validate(req.body[attr], schema[attr])
            if(val.error){
                return res.sendStatus(400)
            }
        }
    }
    for(attr in company){
        if(attr in req.body){
            compant[attr] = req.body[attr]
        }
    }
    return res.send('Updated company')
})

// Deleting data
router.delete('/:uuid', (req, res)=>{
    let uuid = req.params.uuid
    companyIndex = dataSource.findIndex((x) => {return x.uuid == uuid})
    // Company not found
    if(companyIndex === -1){
        return res.sendStatus(400)
    }
    // Delete entry
    dataSource.splice(companyIndex, 1)
    return res.send('Deleted')
})

//Exporting router
module.exports = router