const express = require('express');
//const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const mongoose = require('mongoose')

const Case = require('../../models/Case');
const validator = require('../../validations/caseValidation');
// const cases = [new Case('pending','Ahmed','Amr','Youssef','Company1'), 
//                 new Case('approved','Peter','Amr','Youssef','Comapny2'),
//                 new Case('refused','Sherif','Amr','Youssef','Comapny3')];

//router.get('/', (req, res) => res.json({ data: cases }));

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

// router.post('/', (req, res) => {
//     const status = req.body.status;
//     const investor = req.body.investor;
//     const lawyer = req.body.lawyer;
//     const reviewer = req.body.reviewer;
//     const company_name = req.body.company_name;

//     const schema={
//         status: Joi.string().required(),
//         investor: Joi.string().required(),
//         lawyer: Joi.string().required(),
//         reviewer: Joi.string().required(),
//         company_name: Joi.string().required()
//     }

//     const result = Joi.validate(req.body,schema);

//     if (result.error) return res.status(400).send({ error: result.error.details[0].message });

//     const newCase = {
//         id: uuid.v4(),
//         status,
//         investor,
//         lawyer,
//         reviewer,
//         company_name
//     }
//     cases.push(newCase)
//     return res.json({data: newCase});
// });
// router.get('/:id', (req, res)=>{
//     const caseId = req.params.id
//     const caseElement = cases.find(caseX => caseX.id == caseId)
//     if(caseElement === undefined){
//         res.status(404).send({err: 'We can not find what you are looking for'});
//     }
//     else{
//     res.send({caseElement})}
// });
router.get('/:id', async (req, res)=>{
    try{
        const caseId = req.params.id
        const caseElement = await Case.findById(caseId)
        //console.log(caseElement)
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
        //const caseElement = await Case.findOne({},{_id:id})
        const caseElement = await Case.findById(caseId)
        if(!caseElement){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        //const updatedCase = await Case.updateOne(req.body)
        const updatedCase = await Case.findByIdAndUpdate(caseId,req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})

// router.put('/:id', (req, res) => {  
//     const caseId = req.params.id
//     const caseElement = cases.find(caseX => caseX.id === caseId)
//     if(caseElement === undefined){
//         res.status(404).send({err: 'We can not find what you are looking for'});
//     }
//     else{
//     const status = req.body.status;
//     const investor = req.body.investor;
//     const lawyer = req.body.lawyer;
//     const reviewer = req.body.reviewer;
//     const company_name = req.body.company_name;
    
//     const schema={
//         status: Joi.string(),
//         investor: Joi.string(),
//         lawyer: Joi.string(),
//         reviewer: Joi.string(),
//         company_name: Joi.string()
//     }
   
//     const result = Joi.validate(req.body,schema);

//     if (result.error) return res.status(400).send({ error: result.error.details[0].message });

//     if(status){
//         caseElement.status = status
//     }
//     if(investor){
//         caseElement.investor = investor
//     }
//     if(lawyer){
//         caseElement.lawyer = lawyer
//     }
//     if(reviewer){
//         caseElement.reviewer = reviewer
//     }
//     if(company_name){
//         caseElement.company_name = company_name
//     }
//      res.json({ data: cases })
// }})

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

// router.delete('/:id',(req,res)=>{
//     const caseId = req.params.id
//     const caseElement = cases.find(caseX => caseX.id === caseId)
//     if(caseElement === undefined){
//         res.status(404).send({err: 'We can not find what you are looking for'});
//     }
//     else{
//     const index = cases.indexOf(caseElement)
//     cases.splice(index,1)
//     res.json({ data: cases })}
// })
module.exports = router;