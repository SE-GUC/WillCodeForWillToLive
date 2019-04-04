//new 
const nfetch = require('node-fetch')
const router = require('express').Router()
const validator = require('../../validations/sscForm')
const Form = require('../../models/SscForm')

router.post('/', async (req, res) => {
    try {
        const valid = await validator.validateCreate(res.body)
        if(valid.error) {
            return res.status(404).json({error: valid.error})    
        }
        const newForm = await new Form(res.body).save()
        return res.json(newForm)
    } catch (err) {
        return res.status(404).json({error: err})
    }
})

router.get('/', async (req, res) => {
    try {
        const forms = await Form.find()
        return res.json(forms)
    } catch (err) {
        return res.status(404).json({error:err})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const form = await Form.findOne({_id: req.params.id})
        return res.json(form)
    } catch (err) {
        return res.status(404).json({error: err})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await findOneAndDelete({_id: req.params.id})
        return res.redirect('./')
    } catch (err) {
        res.status(404).json({error: err})
    }
})

router.put('/', async (req, res) => {
    try {
        const valid = await validateUpdate(req.body)
        if(valid.error) {
            return res.status(404).json({error: valid.error})    
        }
        const newForm = await Form.findOneAndUpdate(res.body)
        if(newForm !== null) {
            return res.redirect(`./${req.params.id}`)
        }
    } catch (err) {
        return res.status(404).json({error: err})
    }
})

module.exports = router