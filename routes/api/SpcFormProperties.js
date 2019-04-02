const router = require('express').Router()
const UserConfig = require('../../models/SpcFormProperties')
const validator = require('../../validations/SpcFormPropertiesValidation')

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
