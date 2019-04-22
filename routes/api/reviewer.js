const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const functions = require('../../fn')
const Case = require('../../models/Case')

const Reviewer = require('../../models/Reviewer');
const validator = require('../../validations/reviewerValidations')

const jwt = require('jsonwebtoken')
const tokenkey = require('../../config/keys').secretkey

//const reviewers = [new Reviewer('Pablo Escobar','1/1/1999','Male','Colombian','UUID','02091998','09021998','abulletinthedark@gmail.com','21 Medillin Street'),
  //                  new Reviewer('Tata Escobar','4/3/1999','Female','Colombian','UUID','02091998','09021998','faithfulwife@gmail.com','21 Medillin Street')]

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
          if(payload.type === 'reviewer'){
    const reviewer = await Reviewer.find()
    res.json({data: reviewer})
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
          if(payload.type === 'reviewer'){
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
          if(payload.type === 'reviewer'){
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

//search using /api/reviewer/getCases/
router.get('/getCases', checkTocken,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){ 
    res.redirect('../../cases/')
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.get('/getCases/:reviewer', checkTocken,async (req, res)=>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
    const reviewer = payload.username
    res.redirect('../../cases/reviewerCases/' + reviewer)
}
else{res.json({msg: 'You shall not pass'})}
}
})
})


router.get('/:id', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
    const id = payload.id
    const reviewer = await Reviewer.findById(id)
    if(!reviewer) return res.status(404).send({msg: 'Cannot find Reviewer with specific id'})
    res.json({data: reviewer})
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
        if(isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message})
        const newReviewer = await Reviewer.create(req.body)
        res.json({msg: 'Reviewer created succcessfully', data: newReviewer})
    }
    catch(error){
        console.log(error)
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
});


//UPDATE SPcFORM STATUS

router.put('/spcForm/:id',checkTocken,async (req,res) =>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
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

router.put('/sscForm/:id',checkTocken,async (req,res) =>{
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
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


router.put('/cases/:id',checkTocken, async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
    try{
        const id = payload.id
        const reviewer = await Reviewer.findById(id)
        const isValidated = validator.updateValidation(req.body)
        if(!reviewer)  res.status(404).send({ error: 'Reviewer not found' })
        if(isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedReviewer = await Reviewer.findByIdAndUpdate(id, req.body)
        res.json({msg:'Reviewer updated successfully', data: updatedReviewer})
    }
    catch(error){
        console.log(error)
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})


router.get('/cases', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
    const reviewer = await Reviewer.find()
    res.json({data: reviewer})
}
else{res.json({msg: 'You shall not pass'})}
}
})
})


/*router.get('/:id', (req, res) => {
    const reviewrId = req.params.id
    const reviewerElement = reviewers.find( reviewerX => reviewerX.id = reviewrId)
    if (reviewerElement === undefined){
        res.status(404).send({err: 'Not Found'})}
    else{
        res.send({reviewerElement})
    }
});*/

router.put('/:id', checkTocken,async (req,res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
    try{
        const id = payload.id
        const reviewer = await Reviewer.findById(id)
        const isValidated = validator.updateValidation(req.body)
        if(!reviewer)  res.status(404).send({ error: 'Reviewer not found' })
        if(isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedReviewer = await Reviewer.findByIdAndUpdate(id, req.body)
        res.json({msg:'Reviewer updated successfully', data: updatedReviewer})
    }
    catch(error){
        console.log(error)
    }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

router.put('/assigncasestomyselfthereviewer/:id/',checkTocken ,async (req, res) => {
   jwt.verify(req.token,tokenkey,async (err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type === 'reviewer'){
    try {
      const caseId = req.params.id
      const caseElement = await Case.findById(caseId)
      if (!caseElement) {
        res.status(404).send({ error: 'We can not find what you are looking for' })
      }
      if (caseElement.reviewer !== '-') {
        res.status(400).send({ error: 'case is already taken' })
      }
      const isValidated = validator.assigncasesreviewerValidation(req.body)
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


router.delete('/:id', checkTocken,async (req, res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
    try{
  const id = payload.id
  const deletedReviewer = await Reviewer.findByIdAndRemove(id)
  res.json({msg: 'Reviewer deleted successfully', data: deletedReviewer})
  }
  catch(error){
      console.log(error)
  }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

//as a reviewer, assign task to lawyer
router.put("/task/:username/:taskID", checkTocken,async (req, res) => {
    jwt.verify(req.token,tokenkey,async (err,payload) =>{
        if(err){
          res.status(403).send(err);
        }else{
          if(payload.type === 'reviewer'){
    try {
        Task.findByIdAndUpdate(req.params.taskID, {
            username: req.body.assignee
        }, {
            new: true
        }, function (err, task) {
            if (!err)
                res.json({
                    msg: "Your task has been assigned to the lawyer successfully",
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
