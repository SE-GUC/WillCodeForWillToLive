const router = require('express').Router()
const validator = require('../../validations/SpcFormValidation')
const Form = require('../../models/SpcForm')

const SpcForm = require('../../models/SpcForm');
const config = require('../../config/keys')

router.get('/', async (req,res) => {
    const SpcForms = await SpcForm.find()
    res.json({data: SpcForms})
})

// Create a SpcForm
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newSpcForm = await SpcForm.create(req.body)
     //new
     const investor = req.body.InvestorName
     const lawyer = req.body.LawyerName
     const company = req.body.CompanyName
     const requestBody = {
         status: 'pending',
         investor: investor,
         reviewer: '-',
         lawyer: lawyer,
         company_name: company,
         reviewed_by_lawyer: false,
         reviewed_by_reviewer: false
     }
     const response = await nfetch(`http://localhost:3000/api/cases/`,{
         method: 'POST',
         body: JSON.stringify(requestBody),
         headers: { 'Content-Type': 'application/json' }
     })
     const jsonResponse = await response.json()
     console.log(jsonResponse)
    res.json({msg:'SpcForm was created successfully', data: newSpcForm})
   }
   catch(error) {
    res.status(404).send({error: 'Error, something is off'});
   }  
})

router.get('/calculateFees/:id',async (req,res) =>{
    try{
        const SpcFormId = req.params.id
        const SpcFormElement = await SpcForm.findById(SpcFormId)
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
