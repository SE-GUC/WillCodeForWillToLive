const router = require('express').Router()
const mongoose = require('mongoose')
const UserConfig = require('../../models/SscFormProperties')
const validator = require('../../validations/sscFormProperties')

router.get('/', async (_, res) => {
    try{
        const config = await UserConfig.getSingleton()
        return res.json(config)
    } catch(err) {
        res.status(404).json({error: err})
    }
})

router.put('/', async (req, res) => {
    const valid = validator.validateUpdate(req.body)
    if(valid.error) {
        return res.status(404).send({error: valid.error})
    }
    await UserConfig.findOneAndUpdate(req.body)
    return res.redirect('./')
})

module.exports = router
