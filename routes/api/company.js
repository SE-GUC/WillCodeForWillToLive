// Reuired npm modules
const express = require("express");
const bodyParser = require("body-parser");
const joi = require("joi");
// Required model modules
const Company = require('../../models/Company');

// Create a list to mimic a data source
const dataSource = []; // TODO: Add new company instances after completing the company model

// Initializing router and adding body-parser function
const router = express.Router();
router.use(bodyParser.json());

/*** CRUD implementation ***/
// Creating new data
router.post('/addCompany', (req, res)=>{
    // Validate input data
    let newCompany = null;
    // Add new data to the list
    dataSource.push(newCompany);
});

// Show all data
router.get('/', (req, res)=>{
    res.send(dataSource);
});

// Reading entry
router.get('/:uuid', (req, res)=>{
    let uuid = req.params.uuid;
    let company = dataSource.find(x => x.uuid == uuid);
    // Company not found
    if(!company){
        return res.sendStatus(400);
    }
    res.send(`${company.name}\n${company.investorName}`);
});

// Updating
router.put('/updateCompany/:uuid', (req, res)=>{
    let uuid = req.params.uuid;
    let company = dataSource.find(x => x.uuid == uuid);
    // Company not found
    if(!company){
        return res.sendStatus(400);
    }
    for(attr in company){
        if(req.body[attr]){
            // TODO: validate single attribute
            company[attr] = req.body[attr];
        }
    }
});

// Deleting data
router.delete('/removeCompany/:uuid', (req, res)=>{
    let uuid = req.params.uuid;
    let companyIndex = dataSource.findIndex((x) => {return x.uuid == uuid});
    // Company not found
    if(!company){
        return res.sendStatus(400);
    }
    // Delete entry
    dataSource.slice(companyIndex, 1);
});

//Exporting router
module.exports = router;