const express = require('express');
const router = express.Router();

const Company = require('../../models/Company');
const validator = require('../../validations/CompanyValidation');

const checkTocken = (req, res, next) =>{
    const header = req.headers['authorzation']
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ')
      const token = bearer[1]
      req.token = token
      next()
    } else {
      res.sendStatuss(403)
    }
  }

router.get('/', async (req,res) => {
    const Companys = await Company.find()
    res.json({data: Companys})
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
        const CompanyId = req.params.id
        const CompanyElement = await Company.findById(CompanyId)
        if(!CompanyElement){
            res.status(404).send({error: 'Can not find what you are looking for'});
        }else{
            res.json({data: CompanyElement})
        }
    }
    catch(error){
        res.status(404).send({error: 'Error Something is off'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const CompanyId = req.params.id
        const CompanyElement = await Company.findById(CompanyId)
        if(!CompanyElement){
            res.status(404).send({error: 'Can not find what you are looking for'});
        }
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) {
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        const updatedCompany = await Company.findByIdAndUpdate(CompanyId,req.body)
        res.json({msg: 'update done'})
    }
    catch(error){
        res.status(404).send({error: 'Error Something is off'});
    }
})



router.delete('/:id', async (req,res) => {
    try{
        const CompanyId = req.params.id
        const deletedCompany = await Company.findByIdAndRemove(CompanyId)
        res.json({msg: 'Done'})
    }
    catch(error){
        res.status(404).send({error: 'Error Something is off'});
    }
})


module.exports = router;