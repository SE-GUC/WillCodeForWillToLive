// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const lawyer = require('../../models/lawyer');

const lawArr =[];


router.get('/', (req, res) => res.json({ data: lawArr }));


router.post('/', (req, res) => {
  const name = req.body.name
  const gender = req.body.gender
  const nationality = req.body.nationality
  const typeOfId = req.body.typeOfId
  const Id = req.body.Id
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
    DOB: Joi.date().required(),
    emailAddress: Joi.string(),
    mobileNumber: Joi.number(),
    address: Joi.string().required(),
    faxNumber: Joi.number(),
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) return res.status(400).send({ error: result.error.details[0].message })

  const newLawyer = new lawyer(
    autoid: uuid.v4()
    name,
    gender,
    nationality,
    typeOfId,
    Id,
    DOB,
    emailAddress,
    mobileNumber,
    address,
    faxNumber
  )
  lawArr.push(newLawyer)
  return res.json({ data: newLawyer })
});


router.get('/:id', (req, res) => {
  const lawyerId = req.params.id
  console.log(lawyerId)
  const lawyerInstance = lawArr.find(lawyerX => lawyerX.autoid === lawyerId)
  if (!lawyerInstance) {
    res.status(404).send({ err: 'Lawyer not found' })
  } else {
    res.send({ LawyerInstance })
  }
});


router.put('/:id', (req, res) => {
  const lawyerId = req.params.id
  const lawyerInstance = lawArr.find(lawyerX => lawyerX.autoid === lawyerId)
  if (lawyerInstance === undefined) {
    res.status(404).send({ err: 'Lawyer not found' })
  }
  else {
    const name = req.body.name
    const gender = req.body.gender
    const nationality = req.body.nationality
    const typeOfId = req.body.typeOfId
    const Id = req.body.Id
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
      DOB: Joi.date(),
      mobileNumber: Joi.number(),
      emailAddress: Joi.string(),
      address: Joi.string(),
      faxNumber: Joi.number()
        }

    const result = Joi.validate(req.body, schema)

    if (result.error) return res.status(400).send({ error: result.error.details[0].message })

    if (name) {
        lawyerInstance.name = name
    }
    if (DOB) {
      lawyerInstance.DOB = DOB
    }
    if (gender) {
        lawyerInstance.gender = gender
    }
    if (nationality) {
        lawyerInstance.nationality = nationality
    }
    if (typeOfId) {
        lawyerInstance.typeOfId = typeOfId
    }
    if (Id) {
        lawyerInstance.Id = Id
    }
    if (mobileNumber) {
      lawyerInstance.mobileNumber = mobileNumber
    }
    if (faxNumber) {
       lawyerInstance.faxNumber = faxNumber
    }
    if (emailAddress) {
        lawyerInstance.emailAddress = emailAddress
    }
    if (address) {
      lawyerInstance.address = address
    }
    res.json({ data: lawArr})
  }
});

router.delete('/:id', (req, res) => {
  const lawyerId = req.params.id;
  const lawyerInstance = lawArr.find(lawyerX => lawyerX.autoid === lawyerId)
  if(!lawyerInstance){
      return res.sendStatus(400);
  }
  else{
    const i=lawArr.indexOf(lawyerInstance)
  lawArr.splice(i, 1);
  return res.send(lawyerInstance);
}});
module.exports = router;
