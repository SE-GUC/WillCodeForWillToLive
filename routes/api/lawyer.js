// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const validator = require('../../validations/lawyerValidation');

// Models
const Lawyer = require('../../models/lawyer');

router.get('/', async (req,res) => {
    const lawyers = await Lawyer.find()
    res.json({data: lawyers})
})


router.get('/:id', async (req, res)=>{
    try{
        const lawyer = await Lawyer.findById(req.params.id)
        if(!lawyer){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }else{
            res.json({data: lawyer})
        }
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})


router.post('/', async (req,res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ data: newLawyer})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})


router.put('/:id', async (req, res) => {
    try{
        const lawyer = await Lawyer.findById(req.params.id)
        if(!lawyer){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        const updatedLawyer = await Lawyer.findByIdAndUpdate(req.params.id,req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

router.put('/assigncasestomyselfthelawyer/:id/', async (req, res) => {
  try {
    const caseId = req.params.id
    const caseElement = await Case.findById(caseId)
    if (!caseElement) {
      res.status(404).send({ error: 'We can not find what you are looking for' })
    }
    const isValidated = validator.assigncaseslawyerValidation(req.body)
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message })
    }
    await Case.findByIdAndUpdate(caseId, req.body)
    res.json({ msg: 'Assigned' })
  } catch (error) {
    res.status(400).send({ error: 'Something went wrong' })
  }
})

router.delete('/:id', async (req,res) => {
    try{
        const deletedLawyer = await Lawyer.findByIdAndRemove(req.params.id)
        res.json({msg: 'Done'})
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

module.exports = router;
