const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

const Case = require('../../models/Case');

const cases = [new Case('pending','Ahmed','Amr','Youssef','Company1'), 
                new Case('approved','Peter','Amr','Youssef','Comapny2'),
                new Case('refused','Sherif','Amr','Youssef','Comapny3')];

router.get('/', (req, res) => res.json({ data: cases }));

router.post('/', (req, res) => {
    const status = req.body.status;
    const investor = req.body.investor;
    const lawyer = req.body.lawyer;
    const reviewer = req.body.reviewer;
    const company_name = req.body.company_name;

    const schema={
        status: Joi.string().required(),
        investor: Joi.string().required(),
        lawyer: Joi.string().required(),
        reviewer: Joi.string().required(),
        company_name: Joi.string().required()
    }

    const result = Joi.validate(req.body,schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const newCase = {
        id: uuid.v4(),
        status,
        investor,
        lawyer,
        reviewer,
        company_name
    }
    cases.push(newCase)
    return res.json({data: newCase});
});
router.get('/:id', (req, res)=>{
    const caseId = req.params.id
    const caseElement = cases.find(caseX => caseX.id == caseId)
    res.send({caseElement})
});

router.put('/:id', (req, res) => {  
    const caseId = req.params.id
    const caseElement = cases.find(caseX => caseX.id === caseId)
    const status = req.body.status;
    const investor = req.body.investor;
    const lawyer = req.body.lawyer;
    const reviewer = req.body.reviewer;
    const company_name = req.body.company_name;
   
    const schema={
        status: Joi.string(),
        investor: Joi.string(),
        lawyer: Joi.string(),
        reviewer: Joi.string(),
        company_name: Joi.string()
    }
   
    const result = Joi.validate(req.body,schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    if(status){
        caseElement.status = status
    }
    if(investor){
        caseElement.investor = investor
    }
    if(lawyer){
        caseElement.lawyer = lawyer
    }
    if(reviewer){
        caseElement.reviewer = reviewer
    }
    if(company_name){
        caseElement.company_name = company_name
    }
     res.json({ data: cases })
})
router.delete('/:id',(req,res)=>{
    const caseId = req.params.id
    const caseElement = cases.find(caseX => caseX.id === caseId)
    const index = cases.indexOf(caseElement)
    cases.splice(index,1)
    res.json({ data: cases })
})
module.exports = router;