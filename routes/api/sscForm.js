const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const mongoose = require('mongoose')
//new 
const nfetch = require('node-fetch')

const SscForm = require('../../models/SscForm')
const validator = require('../../validations/SscFormValidation')
const config = require('../../config/keys')


router.get('/', async (req,res) => {
    const SscForms = await SscForm.find()
    res.json({data: SscForms})
})

// Create a SscForm
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newSscForm = await SscForm.create(req.body)
    //new
    const investor = req.body.InvestorName
    const lawyer = req.body.LawyerName
    const company = req.body.CompanyName
    const requestBody = {
        status: 'pending',
        investor: investor,
        reviewer: '-',
        lawyer: lawyer,
        company_name: company
    }
    const response = await nfetch(`http://localhost:3000/api/cases/`,{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    res.json({msg:'SscForm was created successfully', data: newSscForm})
   }
   catch(error) {
    res.status(404).send({error: 'Error, something is off'});
   }  
})

router.get('/calculateFees/:id',async (req,res) =>{
    try{
        const SscFormId = req.params.id
        const SscFormElement = await SscForm.findById(SscFormId)
        if(!SscFormElement){
            res.status(404).send({error: 'can not be Found'});
        }else{
            var law = SscFormElement.RegulatedLaw
            var capital = SscFormElement.Capital
            if(law==="Law159"){
                let gavi = 1/1000 * capital
                if(gavi <100){
                    gavi = 100
                }
                if(gavi>1000){
                    gavi = 1000
                }
                let notary = 0.25/100 * capital
                if(notary <10){
                    notary = 10
                }
                if(notary>1000){
                    notary = 1000
                }
                let Commercial = 56
                let fees = Commercial + gavi + notary
                res.json({data: fees})
            }else{
                let fees = 610
                res.json({data: fees})
            }
        }
      }  
      catch(error){
                res.status(404).send({error: 'Error, something is off'});
        }
    })
router.get('/:id', async (req, res)=>{
    try{
        const SscFormId = req.params.id
        const SscFormElement = await SscForm.findById(SscFormId)
        if(!SscFormElement){
            res.status(404).send({error: 'can not be Found'});
        }else{
            res.json({data: SscFormElement})
        }
    }
    catch(error){
        res.status(404).send({error: 'Error, something is off'});
    }
})
/*
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const SscForm = await SscForm.findOne({id})
     if(!SscForm) return res.status(404).send({error: 'SscForm not found'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedSscForm = await SscForm.updateOne(req.body)
     res.json({msg: 'SscForm updated successfully'})
    }
    catch(error) {
        console.log(error)
    }  
 })*/
 router.put('/:id', async (req, res) => {
    try{
        const SscFormId = req.params.id
        const SscFormElement = await SscForm.findById(SscFormId)
        if(!SscFormElement){
            res.status(404).send({error: 'SscForm not found'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        const updatedSscForm = await SscForm.findByIdAndUpdate(SscFormId,req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Error, something is off'});
    }
})
router.delete('/:id', async (req,res) => {
    try{
        const SscFormId = req.params.id
        const deletedSscForm = await SscForm.findByIdAndRemove(SscFormId)
        res.json({msg: 'Done'})
    }
    catch(error){
        res.status(404).send({error: 'Error, something is off'});
    }
})
 module.exports = router