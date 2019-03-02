const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Investor = require('../../models/Investor')
const validator = require('../../validations/investorValidations')

//create Investor
router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].investor })
     const newInvestor = await Investor.create(req.body)
     res.json({msg:'Profile was created successfully', data: newInvestor})
    }
    catch(error) {
        console.log(error)
    }  
 })


//view Investor
router.get('/', async (req,res) => {
    const investors = await Investor.find()
    res.json({data: investors})
})

//view Investor by id
router.get("/:_id", async (req, res) => {
    const id = req.params.id
    const investor = await Investor.findOne({id})
    res.json({data: investor})
});

//update investor by id
router.put('/:_id', async (req,res) => {
    try {
     const id = req.params.id
     const investor = await Investor.findOne({id})
     if(!investor) return res.status(404).send({error: 'Investor does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].investor })
     const updatedInvestor = await Investor.updateOne(req.body)
     res.json({msg: 'profile updated successfully'})
    }
    catch(error) {
        console.log(error)
    }  
 })

//delete Investor by id
router.delete('/:_id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedInvestor = await Investor.findOneAndDelete(id)
     res.json({msg:'profile was deleted successfully', data: deletedInvestor})
    }
    catch(error) {
        console.log(error)
    }  
 })

module.exports = router