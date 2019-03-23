const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const mongoose = require('mongoose')

const Reviewer = require('../../models/Reviewer');
const validator = require('../../validations/reviewerValidations')

//const reviewers = [new Reviewer('Pablo Escobar','1/1/1999','Male','Colombian','UUID','02091998','09021998','abulletinthedark@gmail.com','21 Medillin Street'),
  //                  new Reviewer('Tata Escobar','4/3/1999','Female','Colombian','UUID','02091998','09021998','faithfulwife@gmail.com','21 Medillin Street')]

router.get('/', async (req,res) => {
    const reviewer = await Reviewer.find()
    res.json({data: reviewer})
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    const reviewer = await Reviewer.findOne(id)
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
        const reviewer = await Reviewer.findOne(id)
        if(!reviewer) return res.status(404).send({error: isValidated.error.details[0].message})
        const updatedReviewer = await Reviewer.updateOne(req.body)
        res.json({msg:'Reviewer updated successfully', data: updatedReviewer})
    }
    catch(error){
        console.log(error)
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


module.exports = router;
