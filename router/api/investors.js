// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Investor = require('../../models/Investor');

const invArr =[];


router.get('/', (req, res) => res.json({ data: invArr }));


router.post('/', (req, res) => {
  const name = req.body.name
  const gender = req.body.gender
  const nationality = req.body.nationality
  const typeOfId = req.body.typeOfId
  const Id = req.body.Id
  const capital = req.body.capital
  const DOB = req.body.DOB
  const mobileNumber = req.body.mobileNumber
  const faxNumber = req.body.faxNumber
  const emailAddress = req.body.emailAddress
  const address = req.body.address

  const schema = {
    name: Joi.string().min(3).required(),
    gender: Joi.string().required(),
    nationality: Joi.string().min(3).required(),
    typeOfId: Joi.string().required(),
    Id: Joi.string().required(),
    capital: Joi.number().required(),
    DOB: Joi.date().required(),
    emailAddress: Joi.string(),
    mobileNumber: Joi.number(),
    address: Joi.string().required(),
    faxNumber: Joi.number(),
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) return res.status(400).send({ error: result.error.details[0].message })

  const newInvestor = new Investor(
    name,
    gender,
    nationality,
    typeOfId,
    Id,
    capital,
    DOB,
    emailAddress,
    mobileNumber,
    address,
    faxNumber
  )
  invArr.push(newInvestor)
  return res.json({ data: newInvestor })
});


router.get('/:id', (req, res) => {
  const InvestorId = req.params.id
  const InvestorInstance = invArr.find(InvestorX => InvestorX.autoid === InvestorId)
  if (!InvestorInstance) {
    res.status(404).send({ err: 'Investor not found' })
  } else {
    res.send({ InvestorInstance })
  }
});


router.put('/:id', (req, res) => {
  const InvestorId = req.params.id
  const InvestorInstance = invArr.find(InvestorX => InvestorX.autoid === InvestorId)
  if (InvestorInstance === undefined) {
    res.status(404).send({ err: 'Investor not found' })
  } 
  else {
    const name = req.body.name
    const gender = req.body.gender
    const nationality = req.body.nationality
    const typeOfId = req.body.typeOfId
    const Id = req.body.Id
    const capital =req.body.capital
    const DOB = req.body.DOB
    const mobileNumber = req.body.mobileNumber
    const emailAddress = req.body.emailAddress
    const address = req.body.address
    const faxNumber = req.body.faxNumber

    const schema = {
      name: Joi.string().min(3),
      gender: Joi.string(),
      nationality: Joi.string().min(3),
      typeOfId: Joi.string(),
      Id: Joi.string(),
      capital: Joi.number(),
      DOB: Joi.date(),
      mobileNumber: Joi.number(),
      emailAddress: Joi.string(),
      address: Joi.string(),
      faxNumber: Joi.number()
        }

    const result = Joi.validate(req.body, schema)

    if (result.error) return res.status(400).send({ error: result.error.details[0].message })

    if (name) {
        InvestorInstance.name = name
    }
    if (DOB) {
      InvestorInstance.DOB = DOB
    }
    if (gender) {
        InvestorInstance.gender = gender
    }
    if (nationality) {
        InvestorInstance.nationality = nationality
    }
    if (typeOfId) {
        InvestorInstance.typeOfId = typeOfId
    }
    if (Id) {
        InvestorInstance.Id = Id
    }
    if (capital) {
        InvestorInstance.capital = capital
    }
    if (mobileNumber) {
      InvestorInstance.mobileNumber = mobileNumber
    }
    if (faxNumber) {
       InvestorInstance.faxNumber = faxNumber
    }
    if (emailAddress) {
        InvestorInstance.emailAddress = emailAddress
    }
    if (address) {
      InvestorInstance.address = address
    }
    res.json({ data: invArr})
  }
});

router.delete('/:id', (req, res) => {
  const InvestorId = req.params.id;
  const InvestorInstance = invArr.find(InvestorX => InvestorX.autoid === InvestorId)
  if(!InvestorInstance){
      return res.sendStatus(400);
  }
  else{
    const i=invArr.indexOf(InvestorInstance)
  invArr.splice(i, 1);
  return res.send(InvestorInstance);
}});
module.exports = router;
