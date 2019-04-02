const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();

const Task = require('../../models/Task');
const validator = require('../../validations/taskValidations')

// const sortByID = (a,b) => {
//     return a.id - b.id

// }

// const sortByCreatedAt = (a,b) => {
//     return a.created_at - b.created_at
// }


//const tasks = [new Task(5, 'Review', '1/1/2019', false),
  //              new Task(3 ,'Check', '5/3/2019',false)]

router.get('/', async (req, res) => {
   try{ const task = await Task.find()
    res.json({data: task})}
    catch(error){
        res.json({error: 'Could not return the list' })
    }
})

router.get('/:id', async (req,res) => {
    try{const id = req.params.id
    const task = await Task.findById(id)
    if(!task) return res.status(404).send({msg: 'Could not find task with that id'})
    res.json({data: task})}
    catch(error){
        res.json({error:'Error occurred'})
    }
})


router.post('/', async (req, res) => {
    try{
        const isValidated = validator.createValidation(req.body)
        if(isValidated.error) res.status(404).send({error: isValidated.error.details[0].message})
        const newTask = await Task.create(req.body)
        res.json({msg: 'Task created successfully', data: newTask})
    }
    catch(error){
        console.log(error)
    }
})

/*router.get('/:id', (req,res) => {
    const taskId = req.params.id
    const taskElement = tasks.find(taskX => taskX.id === taskId)
    if(taskElement === undefined){
        res.status(404).send({err: 'Not found'})
    }
    else{
        res.send({taskElement})
    }
})*/

router.put('/:id',async (req,res) => {
    try{
        const id = req.params.id
        const task = await Task.findById(id)
        if(!task) return res.status(404).send({error: 'Task not found'})
        const isValidated = validator.updateValidation(req.body)
        if(isValidated.error) res.status(404).send({error: isValidated.error.details[0].message})
        const updatedTask = await Task.findByIdAndUpdate(id, req.body)
        res.json({msg: 'Task has been updated', data: updatedTask})
    }
    catch(error){
        console.log(error)
    }
})

router.delete('/:id', async (req,res) => {
    try{
    const id = req.params.id
    const deletedTask = await Task.findByIdAndRemove(id)
    res.json({msg: 'Task has been deleted successfully', data: deletedTask})
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;
