// npm imports
const express = require("express");
const bodyParser = require("body-parser");
const joi = require("joi");
const uuid = require('uuid');
// Model imports
const Form = require('../../models/form/SscForm')

// global constants
const router = express.Router()
const data = []

//CRUD
router.post('/', (req, res) => {
    schema = Form.getSchema()
    valid = joi.validate(req.body, schema)
    if(valid.error){
        return res.status(400).send({ error: valid.error.details[0].message })
    }
    let newForm = new Form(req.body)
    data.push(newForm)
    return res.send(newForm)
})

router.get('/', (req, res)=>{
    return res.send(data)
})

router.get('/:id', (req, res) => {
    let FormElement = data.find(FormX => FormX.id === req.params.id)
    if(FormElement === undefined){
        return res.status(404).send({err: 'Form  Not found'})
    }
    return res.send(FormElement)
})

router.put('/:id', (req, res) => {
    let formElementIndex = data.findIndex(formX => formX.id === req.params.id)
    if(formElementIndex === -1){
        return res.status(404).send({err: 'Form  Not found'})
    }
    const schema = Form.getSchema()
    valid = joi.validate(req.body, schema)
    if(valid.error){
        return res.status(400).send({ error: valid.error.details[0].message })
    }
    data[formElementIndex] = req.body
    return res.send(req.body)
})

router.delete('/:id', (req, res) => {
    let formElementIndex = data.findIndex((form) => {form.id === req.params.id})
    if(FormElementIndex === -1){
        return res.status(404).send({err: 'Form  Not found'})
    }
    let form = data[formElementIndex]
    data.splice(formElementIndex, 1)
    return res.send(form)
})

module.exports = router
