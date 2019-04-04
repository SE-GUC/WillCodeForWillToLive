const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const functions = require('../../fn')

const Reviewer = require('../../models/Reviewer');
const validator = require('../../validations/reviewerValidations')

//const reviewers = [new Reviewer('Pablo Escobar','1/1/1999','Male','Colombian','UUID','02091998','09021998','abulletinthedark@gmail.com','21 Medillin Street'),
  //                  new Reviewer('Tata Escobar','4/3/1999','Female','Colombian','UUID','02091998','09021998','faithfulwife@gmail.com','21 Medillin Street')]

router.get('/', async (req,res) => {
    const reviewer = await Reviewer.find()
    res.json({data: reviewer})
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

//search using /api/reviewer/getCases/
router.get('/getCases', async (req, res)=>{
    res.redirect('../../cases/')
})

router.get('/getCases/:reviewer', async (req, res)=>{
    const reviewer = req.params.reviewer
    res.redirect('../../cases/reviewerCases/' + reviewer)
})


router.get('/:id', async (req,res) => {
    const id = req.params.id
    const reviewer = await Reviewer.findById(id)
    if(!reviewer) return res.status(404).send({msg: 'Cannot find Reviewer with specific id'})
    res.json({data: reviewer})
})



router.post('/', async (req,res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if(isValidated.error) return res.status(404).send({error: isValidated.error.details[0].message})
        const newReviewer = await Reviewer.create(req.body)
        res.json({msg: 'Reviewer created succcessfully', data: newReviewer})
    }
    catch(error){
        console.log(error)
    }
});


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

router.put('/sscForm/:id',async (req,res) =>{
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


router.put('/cases/:id', async (req,res) => {
    try{
        const id = req.params.id
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
})


router.get('/cases', async (req,res) => {
    const reviewer = await Reviewer.find()
    res.json({data: reviewer})
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

router.put('/:id', async (req,res) => {
    try{
        const id = req.params.id
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
})

router.put('/assigncasestomyselfthereviewer/:id/', async (req, res) => {
    try {
      const caseId = req.params.id
      const caseElement = await Case.findById(caseId)
      if (!caseElement) {
        res.status(404).send({ error: 'We can not find what you are looking for' })
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
  })


router.delete('/:id', async (req, res) => {
  try{
  const id = req.params.id
  const deletedReviewer = await Reviewer.findByIdAndRemove(id)
  res.json({msg: 'Reviewer deleted successfully', data: deletedReviewer})
  }
  catch(error){
      console.log(error)
  }
})

//as a reviewer, assign task to lawyer
router.put("/task/:username/:taskID", async (req, res) => {
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
});

module.exports = router;
