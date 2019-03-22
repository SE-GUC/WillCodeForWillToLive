const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const schema = require('../../models/SscForm')
const config = require('../../config/keys')

router.get('/', async (req,res) => {
    const SscForm = await SscForm.find()
    res.json({data: SscForm})
})

// Create a SscForm
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newSscForm = await SscForm.create(req.body)
    res.json({msg:'SscForm was created successfully', data: newSscForm})
   }
   catch(error) {
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
