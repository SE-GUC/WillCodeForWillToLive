const router = require('express').Router()
const mongoose = require('mongoose')
const UserConfig = require('../../models/SpcFormProperties')
const validator = require('../../validations/SpcFormProperties')

router.get('/', (_, res) => {
    UserConfig.getSingleton((err, config) => {
        if(err) {
            res.status(404).send({error: err})
        } else if(config === null){
            res.status(404).send({error: 'Could not find record'})
        } else {
            res.send({data: config})
        }
    })
})
router.put('/', (req, res) => {
    const valid = validator.validateUpdate(req.body)
    if(valid.err) {
        res.status(404).send({error: err})
    }
    UserConfig.findOneAndUpdate(
        { $set: req.body }
    ).then(newConfig => res.json(newConfig))
})

module.exports = router