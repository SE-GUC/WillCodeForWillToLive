const Model = require('../../models/FormTemplate')
const validator = require('../../validations/formTemplate')
const router = require('express').Router()

router.post('/', async (req, res) => {
  try {
    const valid = validator.validateCreate(req.body)
    if(valid.error) {
      res.status(400).json({error: valid.error})
    } else {
      const data = await Model.create(req.body)
      res.json(data)
    }
  } catch(err) {
    res.status(500).json({error: err})
  }
})

router.get('/', async (_, res) => {
  try {
    const data = await Model.find()
    res.json(data)
  } catch(err) {
    res.status(500).json({error: err})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id)
    if(!data){
      res.status(404).json({error: 'Page not found.'})
    } else {
      res.json(data)
    }
  } catch(err) {
    res.status(500).json({error: err})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const valid = validator.validateUpdate(req.body)
    if(valid.error) {
      res.status(400).json({error: valid.error})
    } else {
      const data = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
      if(!data) {
        res.status(404).json({error: 'Page not found.'})
      } else {
        res.json(data)
      }
    }
  } catch(err) {
    res.status(500).json({error: err})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id)
    if(!data) {
      res.status(404).json({error: 'Page not found.'})
    } else {
      res.json(data)
    }
  } catch(err) {
    res.status(500).json({error: err})
  }
})

module.exports = router