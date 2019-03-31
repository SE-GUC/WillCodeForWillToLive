const router = require('express').Router()
const mongoose = require('mongoose')
const SscProps = require('../../models/SscFormProperties')
const validator = require('../../validations/sscFormProperties')

router.get('/', async (_, res) => {
    try{
        const config = await SscProps.getSingleton()
        return res.json(config)
    } catch(err) {
        res.status(404).json({error: err})
    }
})

router.put('/', async (req, res) => {
    try {
        const valid = validator.validateUpdate(req.body)
        if(valid.error) {
            return res.status(404).send({error: valid.error})
        }
        // Making sure a config exists
        await SscProps.getSingleton()
        await SscProps.findOneAndUpdate(req.body)
        return res.redirect('./')
    } catch (err) {
        return res.status(404).send({error: err})
    }
})

module.exports = router
