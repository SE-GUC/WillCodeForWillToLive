const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Company = require('../../models/Company');
const validator = require('../../validations/CompanyValidation');

router.get('/', async (req,res) => {
    const companys = await Company.find()
    res.json({data: companys})
})

router.post('/', async (req,res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newCompany = await Company.create(req.body)
        res.json({ data: newCompany})
    }catch(error){
        res.status(404).send({error: 'Error Something is off'});
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const companyId = req.params.id
        const companyElement = await Company.findById(companyId)
        if(!companyElement){
            res.status(404).send({error: 'Can not find what you are looking for'});
        }else{
            res.json({data: companyElement})
        }
    }
    catch(error){
        res.status(404).send({error: 'Error Something is off'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const companyId = req.params.id
        const companyElement = await Company.findById(companyId)
        if(!companyElement){
            res.status(404).send({error: 'Can not find what you are looking for'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        const updatedCompany = await Company.findByIdAndUpdate(companyId,req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Error Something is off'});
    }
})



router.delete('/:id', async (req,res) => {
    try{
        const companyId = req.params.id
        const deletedCompany = await Company.findByIdAndRemove(companyId)
        res.json({msg: 'Done'})
    }
    catch(error){
        res.status(404).send({error: 'Error Something is off'});
    }
})


module.exports = router;