const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const SpcForm = require('../../models/SpcForm');
const validator = require('../../validations/SpcFormValidation');

router.get('/', async (req,res) => {
    const SpcForm = await SpcForm.find()
    res.json({data: SpcForm})
})

// Create a SpcForm
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newSpcForm = await SpcForm.create(req.body)
    res.json({msg:'SpcForm was created successfully', data: newSpcForm})
   }
   catch(error) {
    res.status(404).send({error: 'Error, something is off'});
   }  
})
router.get('/:id', async (req, res)=>{
    try{
        const SpcFormId = req.params.id
        const SpcFormElement = await SpcForm.findById(SpcFormId)
        if(!SpcFormElement){
            res.status(404).send({error: 'can not be Found'});
        }else{
            res.json({data: SpcFormElement})
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
     const SpcForm = await SpcForm.findOne({id})
     if(!SpcForm) return res.status(404).send({error: 'SpcForm not found'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedSpcForm = await SpcForm.updateOne(req.body)
     res.json({msg: 'SpcForm updated successfully'})
    }
    catch(error) {
        console.log(error)
    }  
 })*/
 router.put('/:id', async (req, res) => {
    try{
        const SpcFormId = req.params.id
        const SpcFormElement = await SpcForm.findById(SpcFormId)
        if(!SpcFormElement){
            res.status(404).send({error: 'SpcForm not found'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        const updatedSpcForm = await SpcForm.findByIdAndUpdate(SpcFormId,req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Error, something is off'});
    }
})
router.delete('/:id', async (req,res) => {
    try{
        const SpcFormId = req.params.id
        const deletedSpcForm = await SpcForm.findByIdAndRemove(SpcFormId)
        res.json({msg: 'Done'})
    }
    catch(error){
        res.status(404).send({error: 'Error, something is off'});
    }
})
 module.exports = router