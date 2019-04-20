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
    const valid = await validator.validateCreate(req.body)
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
  try {
    const data = await Model.findById(req.params.id)
    if(!data){
      res.status(404).json({error: 'Page not found.'})
    } else {
      res.json(data.fields)
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({error: err})
  }
})



router.get('/allForms/:id', async (req, res) => {
  try{
    const data = await Model.find({userId: req.params.id})
    if(!data) {
      res.status(404).json({error: 'No data found'})
    }
    const getResult = data.map(form => {
      let nameArabic = form.fields.filter(({name}) => name.toLowerCase() === 'company name arabic')
      nameArabic = nameArabic.length === 0? undefined:nameArabic[0]
      let nameEnglish = form.fields.filter(({name}) => name.toLowerCase() === 'company name english')
      nameEnglish = nameEnglish.length === 0? undefined:nameEnglish[0]
      return {
      _id: form._id,
      nameArabic: nameArabic,
      nameEnglish: nameEnglish
    }})
    res.json(getResult)
  }catch (error) {
    res.status(500).json({error: error})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const valid = await validator.validateUpdate(req.body)
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
    const form = await Model.findById(req.params.id)
    if(!form) {
      res.status(404).sendFile('Company not found')
    }
    const law = form.fields.find(({name}) => name.toLowerCase() === 'regulatinglaw').value
    const capital = form.fields.find(({name}) => name.toLowerCase() === 'capital').value
    if(law.toLowerCase() === 'law159'){
      const gavi = 1/1000 * capital
      if(gavi <100){
          gavi = 100
      }
      if(gavi>1000){
          gavi = 1000
      }
      const notary = 0.25/100 * capital
      if(notary <10){
          notary = 10
      }
      if(notary>1000){
          notary = 1000
      }
      const Commercial = 56
      const fees = Commercial + gavi + notary
      res.json({fees: fees})
    }else{
      const fees = 610
      res.json({fees: fees})
    }
  } catch (err) {
      return res.status(404).send(error)
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
    res.status(500).send(error)
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