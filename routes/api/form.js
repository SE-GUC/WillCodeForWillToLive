const Model = require('../../models/Form')
const validator = require('../../validations/form')
const router = require('express').Router()
const nfetch = require('node-fetch')
const PdfPrinter = require('pdfmake')
const fs = require('fs')

const createNewCase = async (body) => {
  try{
    const investor = body.investorInfo.name
    const company = body.companyName.arabic
    const requestBody = {
        status: 'pending',
        investor: investor,
        reviewer: '-',
        lawyer: '-',
        company_name: company
    }
    await nfetch(`http://localhost:${process.env.PORT}/api/cases/`,{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    })
  } catch(error) {
    console.log(`Error creating case: ${error}`)
  }
}

router.post('/', async (req, res) => {
  try {
    const valid = validator.validateCreate(req.body)
    if(valid.error) {
      res.status(400).json({error: valid.error})
    } else {
      const modelData = {fields: Object.keys(req.body).map(key => ({name: key, value: req.body[key]}))}
      modelData.userId='1'
      const data = await Model.create(modelData)
      // createNewCase(req.body)
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
    const getResult = data.map(form => form.fields)
    res.json(getResult)
  } catch(err) {
    res.status(500).json({error: err})
  }
})

router.get('/:id', async (req, res) => {
  try {lc
    const data = await Model.findById(req.params.id)
    if(!data){
      res.status(404).json({error: 'Page not found.'})
    } else {
      res.json(data.fields)
    }
  } catch(err) {
    res.status(500).json({error: err})
  }
})



router.get('/allForms/:id', async (req, res) => {
  try{
    const data = await Model.find({userId: req.params.id})
    const getResult = data.map(form => form.fields)
    res.json(getResult)
    if(!data) {
      res.status(404).json({error: 'No data found'})
    } else {
      res.json(data)
    }
  }catch (error) {
    res.status(500).json({error: error})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const valid = validator.validateUpdate(req.body)
    if(valid.error) {
      res.status(400).json({error: valid.error})
    } else {
      const modelData = {fields: [Object.keys(req.body).map(key => ({name: key, value: req.body[key]}))]}
      const data = await Model.findByIdAndUpdate(req.params.id, modelData, {new: true})
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

router.put('/updateFees/:id', async (req, res) => {
  try{
    const valid = validator.validateFees(req.body)
    if(valid.error) {
      res.status(400).json({error: valid.error})
    } else {
      const model = Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
      if(model === null) {
        res.status(404).json({error: 'Page not found'})
      } else {
        res.json(model)
      }
    }
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// PDF STUFF
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
}

router.get('/createPdf/:id', async(req, res) => {
  try{
    const printer = new PdfPrinter(fonts)
    const data = await Model.findById(req.params.id)
    if(!data) {
      res.status(404).json({error: 'Form not found'})
    } else {
      const fields = data.fields
      const docDefinition = {
        content: fields.map(field => ({
          text: [
            {text: field.name, fontSize: 20, bold: true},
            {text: ` ${field.value}`, fontSize: 15, bold: false},
          ]
        }))
      }
      const pdfDoc = printer.createPdfKitDocument(docDefinition)
      pdfDoc.end()
      pdfDoc.pipe(fs.createWriteStream('document.pdf'))
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'inline; filename="Document.pdf"')
      pdfDoc.pipe(res)
    }
  } catch(error){
    console.log(error)
     res.status(500).send({error: error})
  }
})


module.exports = router