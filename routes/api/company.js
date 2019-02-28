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
    var newCompany = null;
    // Add new data to the list
    dataSource.push(newCompany);
});

// Show all data
router.get('/', (req, res)=>{
    res.send(dataSource);
});

// Reading entry
router.get('/:id', (req, res)=>{
    // Validate the id
    var id = req.params.id;
    if(validateId(id)){
        return res.sendStatus(400);
    }
    // Return the company
    var company = dataSource[id];
    res.send(`${company.name}\n${company.investorName}`);
});

// Updating
router.put('/updateCompany/:id', (req, res)=>{
    // Validate the id
    var id = req.params.id;
    if(validateId(id)){
        return res.sendStatus(400);
    }
    // TODO: Validate input data
    var newCompany = null;
    // Adding new data to the list
    dataSource.push(newCompany);
});

// Deleting data
router.delete('/removeCompany/:id', (req, res)=>{
    // Validate the id
    var id = req.params.id;
    if(validateId(id)){
        return res.sendStatus(400);
    }
    // Delete entry
    dataSource.slice(id, 1);
});

// id validation function
function validateId(id){
    return ((isNaN(id)) || id < 0 || id >= dataSource.length);
}

//Exporting router
module.exports = router;