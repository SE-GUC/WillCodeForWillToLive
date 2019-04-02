const router = require('express').Router()
const Model = require('../../models/Company')
const validator = require('../../validations/CompanyValidation')

/** * CRUD implementation ***/
// Create new record
router.post('/', async (req, res)=>{
    try{
        const valid = await validator.createValidation(req.body)
        if(valid.error) {
            res.status(400).json({error: valid.error})
        } else {
            const newModel = await Model.create(req.body)
            res.json(newModel)
        }
    } catch(err) {
        res.status(500).json({error: err})
    }
    
})

// Show all records
router.get('/', async (req, res)=>{
    try{
        const models = await Model.find()
        res.json(models)
    } catch(err) {
        res.status(500).json({error: err})
    }
})

// Showing a record
router.get('/:id', (req, res)=>{
    try {
        const data = await Model.findById(req.params.id)
        if(data === null) {
            res.status(404).json({error: 'Resource not found'})
        } else {
            res.json(data)
        }
    } catch(err) {
        res.status(500).json({error: err})
    }
})

// Update a record
router.put('/:id', (req, res)=>{
    try{
        const valid = await validator.updateValidation(req.body)
        if(valid.error) {
            res.status(400).json({error: valid.error})
        } else {
            const data = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if(data === null) {
                res.status(404).json({error: 'Resource not found'})
            } else {
                res.json(data)
            }
        }
    } catch(err) {
        res.status(500).json({error: err})
    }
})

// Delete a record
router.delete('/:id', (req, res)=>{
    try {
        const data = await Model.findByIdAndDelete(req.params.id)
        if(data === null) {
            res.status(404).json({error: 'Resource not found'})
        } else {
            res.json(data)
        }
    } catch(err) {
        res.status(500).json({error: err})
    }
})

//Exporting router
module.exports = router
