const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

const Task = require('../../models/Task');

const tasks = [new Task(5, 'Review', '1/1/2019', false),
                new Task(3 ,'Check', '5/3/2019',false)]

router.get('/', (req, res) => res.json({data: Task}))

router.post('/', (req, res) => {
    const priority = req.body.priority
    const description = req.body.description
    const created_at = req.body.created_at
    const isDone = req.body.isDone

    const schema = {
        priority: Joi.string().required(),
        description: Joi.string().required(),
        created_at: Joi.string().required(),
        isDone: Joi.boolean().required()
    }

    const result = Joi.validate(req.body,schema)

    if(result.error) return res.status(400).send({error: result.error.details[0].message})

    const newTask = {
        id: uuid.v4(),
        priority,
        description,
        created_at,
        isDone
    }

    tasks.push(newTask)
    return res.json({data: newTask})
})

router.get('/:id', (req,res) => {
    const taskId = req.params.id
    const taskElement = tasks.find(taskX => taskX.id === taskId)
    if(taskElement === undefined){
        res.status(404).send({err: 'Not found'})
    }
    else{
        res.send({taskElement})
    }
})

router.put('/:id', (req,res) => {
    const taskId = req.params.id
    const taskElement = tasks.find(taskX => taskX.id === taskId)
    if(taskElement === undefined){
        res.status(404).send({err: 'Not found'})
    }
    else{
        const priority = req.body.priority
        const description = req.body.description
        const created_at = req.body.created_at
        const isDone = req.body.isDone
    
        const schema = {
            priority: Joi.string(),
            description: Joi.string(),
            created_at: Joi.string(),
            isDone: Joi.boolean()
        }
        
        const result = Joi.validate(req.body,schema)

        if(result.error) return res.status(400).send({error: result.error.details[0].message})
    
        if(priority){
            taskElement.priority = priority
        }

        if(description){
            taskElement.description = description
        }

        if(created_at){
            taskElement.created_at = created_at
        }

        if(isDone){
            taskElement.isDone = isDone
        }

        res.json({data: tasks})
    }
})

router.delete('/:id', (req,res) => {
    const taskId = req.params.id
    const taskElement = tasks.find(taskX => taskX.id === taskId)
    if(taskElement === undefined){
        res.status(404).send({err: 'Not found'})
    }
    else{
        const index = tasks.indexOf(tasks)
        tasks.splice(index,1)
        res.json({data: tasks})
    }
})
module.exports = router;
