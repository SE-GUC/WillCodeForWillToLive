// Dependencies
const express = require('express');
const router = express.Router();
const validator = require('../../validations/lawyerValidation');
const functions = require('../../fn');
const Case = require('../../models/Case')
const jwt = require('jsonwebtoken')
const tokenkey = require('../../config/keys').secretkey

// Models
const Lawyer = require('../../models/lawyer');

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

router.get('/',checkTocken, async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    const lawyers = await Lawyer.find()
    res.json({data: lawyers})
}
else{res.json({msg: 'You shall not pass'})}
}
})
})



router.get('/sortTaskByID', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    console.log('Entered sortID')
    try{
        const tasks = await functions.sortTaskById()
        
        res.json({data: tasks})
    }
    catch(error){
        console.log({error: 'Error in sort Task has occurred'})
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
 })

router.get('/sortTaskByCreationDate',checkTocken, async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try{
        const tasks = await functions.sortTaskByCreationDate()
        
        res.json({data: tasks})
    }
    catch(error){
        console.log({error: 'Error in sort Task has occurred'})
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})

})
//search using /api/lawyer/get/
router.get('/getCases',checkTocken, async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){

    res.redirect('../../cases/')

}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.get('/getCases/:lawyer', checkTocken,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    const lawyer =payload.username
    res.redirect('../../cases/lawyerCases/' + lawyer)
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.get('/:id',checkTocken ,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try{
        const lawyer = await Lawyer.findById(payload.id)
        if(!lawyer){
            res.status(404).send({error: 'We can not find what you are looking for'});
        }else{
            res.json({data: lawyer})
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
//as a lawyer, assign task to investor
router.put("/task/:username/:taskID", checkTocken,async (req, res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try {
        Task.findByIdAndUpdate(req.params.taskID, {
            username: req.body.assignee
        }, {
            new: true
        }, function (err, task) {
            if (!err)
                res.json({
                    msg: "Your task has been assigned to the investor successfully",
                    data: task
                });
            else
                res.json({
                    msg: err.message
                });
        });
    } catch (error) {
        res.json({
            msg: error.message
        });
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
});
module.exports = router;


router.post('/api/spcForm',  checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ data: newLawyer})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})


router.post('/api/sscForm', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ data: newLawyer})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})


router.post('/', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'admin'){
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        
        res.json({msg: 'Lawyer created succcessfully', data: newLawyer})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})


router.put('/:id', checkTocken,async (req, res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try{
        const lawyer = await Lawyer.findById(payload.id)
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
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.put('/assigncasestomyselfthelawyer/:id/', checkTocken,async (req, res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try {
    const caseId = req.params.id
    const caseElement = await Case.findById(caseId)
    if (!caseElement) {
      res.status(404).send({ error: 'We can not find what you are looking for' })
    }
    if (caseElement.lawyer !== '-') {
      res.status(400).send({ error: 'case is already taken' })
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
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

//UPDATE SPcFORM STATUS

router.put('/spcForm/:id',checkTocken,async (req,res) =>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try{
      const form = await SpcForm.findById(req.params.id)
      if(!form){
          res.status(404).send({error: 'We can not find what you are looking for'});
      }
      //const isValidated = validator.updateValidation(req.body)
      //if (isValidated.error) {
        //  res.status(400).send({ error: isValidated.error.details[0].message })
      //}
      if(req.body.Status){
        const updatedForm = await SpcForm.findByIdAndUpdate(req.params.id,req.body)
        res.json({msg: 'Status updated'})
      }else{
        res.status(404).send({error: 'Status is missing'})
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

//UPDATE SscFORM STATUS

router.put('/sscform/:id',checkTocken,async (req,res) =>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
  try{
      const form = await SscForm.findById(req.params.id)
      if(!form){
          res.status(404).send({error: 'We can not find what you are looking for'});
      }
      //const isValidated = validator.updateValidation(req.body)
      //if (isValidated.error) {
        //  res.status(400).send({ error: isValidated.error.details[0].message })
      //}
      if(req.body.Status){
        const updatedForm = await SscForm.findByIdAndUpdate(req.params.id,req.body)
        res.json({msg: 'Status updated'})
      }else{
        res.status(404).send({error: 'Status is missing'})
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

//ADD A REVIEW

router.post('/cases',checkTocken, async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ data: newLawyer})
    }catch(error){
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
          if(payload.type === 'lawyer'){
    try{
        const deletedLawyer = await Lawyer.findByIdAndRemove(req.params.id)
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
router.post('/createsscform', checkTocken,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    res.redirect(307,'./../sscform')
}
else{res.json({msg: 'You shall not pass'})}
}
})
})
router.post('/createspcform', checkTocken,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    res.redirect(307,'./../spcform')
}
else{res.json({msg: 'You shall not pass'})}
}
})
})
router.put('/updatesscform/:id', async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    const formid=payload.id
    res.redirect(307,'./../sscform/'+formid)
}
else{res.json({msg: 'You shall not pass'})}
}
})
})
router.put('/updatespcform/:id',checkTocken ,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'lawyer'){
    const formid=payload.id
    res.redirect(307,'./../spcform/'+formid)
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

module.exports = router;
