const Model = require('../../models/Form')
const validator = require('../../validations/form')
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
    console.log(err)
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

router.get('/calculateFees/:id',async (req,res) =>{
  try{
      const SpcFormId = req.params.id
      const SpcFormElement = await Model.findById(SpcFormId)
      if(!SpcFormElement){
          res.status(404).send({error: 'can not be Found'});
      }
      else{

          var law = SpcFormElement.RegulatedLaw
          var capital = SpcFormElement.Capital
          if(law==="Law159"){
              let gavi = 1/1000 * capital
              if(gavi <100){
                  gavi = 100
              }
              if(gavi>1000){
                  gavi = 1000
              }
              let notary = 0.25/100 * capital
              if(notary <10){
                  notary = 10
              }
              if(notary>1000){
                  notary = 1000
              }
              let Commercial = 56
              let fees = Commercial + gavi + notary
              res.json({data: fees})
          }else{
              let fees = 610
              res.json({data: fees})
          }
      }
      const newForm = await new Model(res.body).save()
      return res.json({data: newForm})
  } catch (err) {
      return res.status(404).json({error: err})
  }
})

module.exports = router