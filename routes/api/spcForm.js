const router = require('express').Router()
const mongoose = require('mongoose')
const validator = require('../../validations/SpcForm')
const Form = require('../../models/SpcForm')

router.post('/', (req, res) => {
    validator.validateCreate(req.body, (err, body) => {
        if(err) {
            res.status(404).send({error: err})
        } else if(body === null) {
            res.status(404).send('Error')
        } else {
            Form.create(body, (err, newForm) => {
                if(err) {
                    res.status(404).send({error: err})
                }
                res.send({data: newForm})
            })
        }
    })
})
router.get('/', (req, res) => {
    Form.find()
    .then(Forms => res.json(Forms))
    .catch(err => res.status(404).json({error: err}))
})

router.get('/:id', (req, res) => {
    Form.find({'_id': id})
    .then(Form => res.json(Form))
    .catch(err => res.status(404).json({error: err}))
})
router.delete('/:id', (req, res) => {
    Form.findOneAndDelete({'_id': id})
    .then((_) => res.redirect('/'))
    .catch(err => res.status(404).send({error: err}))
})

router.put('/', (req, res) => {
    validator.validateUpdate(req.body, (err, body) => {
        if(err) {
            res.status(404).send({error: err})
        } else if(body === null) {
            res.status(404).send('Error')
        } else {
            Form.findOneAndUpdate(
                { $set: body }
            ).then(newForm => res.json(newForm))
        }
    })
})
module.exports = router
