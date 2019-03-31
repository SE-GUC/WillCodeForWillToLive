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
//as a lawyer, assign task to investor
router.put("/task/:investorID/:taskID", async (req, res) => {
    try {
        Task.findByIdAndUpdate(req.params.taskID, {
            investorID: req.params.investorID
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
