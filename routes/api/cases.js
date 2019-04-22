const express = require('express');
const router = express.Router();
const axios = require('axios')

const Case = require('../../models/Case');
const validator = require('../../validations/caseValidation');

router.get('/', async (req,res) => {
    const cases = await Case.find()
    res.json({data: cases})
})

router.post('/', async (req,res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newCase = await Case.create(req.body)
        res.json({ data: newCase})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

router.get('/investorCases/:investor', async (req, res)=>{
    try{
        const caseInvestor = req.params.investor
        var caseElements = await Case.find({"investor": caseInvestor})
        if(!caseElements){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }else{
            res.json({data: caseElements})
        }
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

router.get('/reviewerCases/:reviewer', async (req, res)=>{
    try{
        const caseReviewer = req.params.reviewer
        var caseElements = await Case.find({"reviewer": caseReviewer})
        if(!caseElements){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }else{
            res.json({data: caseElements})
        }
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

router.get('/lawyerCases/:lawyer', async (req, res)=>{
    try{
        const caseLawyer = req.params.lawyer
        var caseElements = await Case.find({"lawyer": caseLawyer})
        if(!caseElements){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }else{
            res.json({data: caseElements})
        }
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})
router.get('/:id', async (req, res)=>{
    try{
        const caseId = req.params.id
        const caseElement = await Case.findById(caseId)
        if(!caseElement){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }else{
            res.json({data: caseElement})
        }
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const caseId = req.params.id
        const caseElement = await Case.findById(caseId)
        if(!caseElement){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        const updatedCase = await Case.findByIdAndUpdate(caseId,req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

router.put('/updateByCompanyName/:id', async (req, res) => {
    try{
        const caseId = req.params.id
        const caseElement = await Case.findOne({companyName: caseId})
        if(!caseElement){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        const updatedCase = await Case.findOneAndUpdate({companyName: caseId}, req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

router.get('/payFees/:id', async (req, res) => {
    try {
        const caseInstance = await Case.findByIdAndUpdate(req.params.id, {paid: true}, {new: true})
        if(!caseInstance) {
            res.status(400).send('Data not found')
        } else {
            axios(`/api/cases`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {formId: caseInstance.formID}
            })
            .then(ress => res.json(caseInstance))
            .catch(error => res.status(500).send(error))
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const caseId = req.params.id
        const deletedCase = await Case.findByIdAndRemove(caseId)
        res.json({msg: 'Done'})
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})


module.exports = router;