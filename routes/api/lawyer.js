// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const validator = require('../../validations/lawyerValidation');
const functions = require('../../fn');

// Models
const Lawyer = require('../../models/lawyer');

router.get('/', async (req,res) => {
    const lawyers = await Lawyer.find()
    res.json({data: lawyers})
})



router.get('/sortTaskByID', async (req,res) => {
    console.log('Entered sortID')
    try{
        const tasks = await functions.sortTaskById()
        console.log({data: tasks})
        res.json({data: tasks})
    }
    catch(error){
        console.log({error: 'Error in sort Task has occurred'})
    }
 })

router.get('/sortTaskByCreationDate', async (req,res) => {
    try{
        const tasks = await functions.sortTaskByCreationDate()
        console.log({data: tasks})
        res.json({data: tasks})
    }
    catch(error){
        console.log({error: 'Error in sort Task has occurred'})
    }

})
//search using /api/lawyer/getCases/
router.get('/getCases', async (req, res)=>{
    res.redirect('../../cases/')
})

router.get('/getCases/:lawyer', async (req, res)=>{
    const lawyer = req.params.lawyer
    res.redirect('../../cases/lawyerCases/' + lawyer)
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
//as a lawyer, assign task to investor
router.put("/task/:username/:taskID", async (req, res) => {
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
});
module.exports = router;


router.post('/api/spcForm', async (req,res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ data: newLawyer})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
    }
})


router.post('/api/sscForm', async (req,res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ data: newLawyer})
    }catch(error){
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

//UPDATE SPcFORM STATUS

router.put('/spcForm/:id',async (req,res) =>{
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

})

//UPDATE SscFORM STATUS

router.put('/sscform/:id',async (req,res) =>{
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

})

//ADD A REVIEW

router.post('/cases', async (req,res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ data: newLawyer})
    }catch(error){
        res.status(404).send({error: 'Something went wrong'});
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
router.post('/createsscform', async (req, res)=>{
    res.redirect(307,'./../sscform')
})
router.post('/createspcform', async (req, res)=>{
    res.redirect(307,'./../spcform')
})
router.put('/updatesscform/:id', async (req, res)=>{
    const formid=req.params.id
    res.redirect(307,'./../sscform/'+formid)
})
router.put('/updatespcform/:id', async (req, res)=>{
    const formid=req.params.id
    res.redirect(307,'./../spcform/'+formid)
})

module.exports = router;
