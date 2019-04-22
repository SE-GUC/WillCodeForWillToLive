const express = require('express');
const router = express.Router();

const Case = require('../../models/Case');
const validator = require('../../validations/caseValidation');
const jwt = require('jsonwebtoken')
const tokenkey = require('../../config/keys').secretkey

const checkTocken = (req, res, next) =>{
    const header = req.headers['authorization']
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]
    req.token = token
    next()
  } else {
    res.sendStatus(403)
  }
  }
router.get('/', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer' || payload.type === 'admin' || payload.type ==='lawyer' || payload.type === 'investor'){
    const cases = await Case.find()
    res.json({data: cases})
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.post('/',checkTocken, async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer' || payload.type === 'admin' || payload.type ==='lawyer'){
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newCase = await Case.create(req.body)
        res.json({ data: newCase})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.get('/investorCases/:investor',checkTocken, async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'investor'){
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
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.get('/reviewerCases/:reviewer',checkTocken ,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
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
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.get('/lawyerCases/:lawyer', checkTocken,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type ==='lawyer'){
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
}
else{res.json({msg: 'You shall not pass'})}
}
})
})
router.get('/:id', async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer' || payload.type === 'admin' || payload.type ==='lawyer'){
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
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.put('/:id',checkTocken, async (req, res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer' || payload.type === 'admin' || payload.type ==='lawyer'){
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
}
else{res.json({msg: 'You shall not pass'})}
}
})
})



router.delete('/:id', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer' || payload.type === 'admin' || payload.type ==='lawyer'){
    try{
        const caseId = req.params.id
        const deletedCase = await Case.findByIdAndRemove(caseId)
        res.json({msg: 'Done'})
    }
    catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})


module.exports = router;