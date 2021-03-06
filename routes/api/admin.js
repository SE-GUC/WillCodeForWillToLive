const express = require('express')
// const Joi = require('joi')
// const uuid = require('uuid')
const router = express.Router()
const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')

const Admin = require('../../models/admin')
const validator = require('../../validations/adminValidations')
const Case = require('../../models/Case')
const tokenkey = require('../../config/keys').secretkey
// const Task = require('../../models/Task')
/* const EntityEmployees = [
  new EntityEmployee('Amr', 'Ahmed', 'ElNahas', new Date(1998, 6, 7), 'male', 'Egyptian', 'Passport', 6969696969, 'lawyer', 8675309, 213432532, 'amrtea.edu@gmail.com', 'Cairo'),
  new EntityEmployee('Marven', 'Waitforit', 'Eriksen', new Date(2012, 5, 14), 'male', 'American', 'Passport', 73621823, 'Reviewer', 50005000, 74283446, 'MarvinEriksen@gmail.com', 'US'),
  new EntityEmployee('Ron', 'redacted', 'Swanson', new Date(1978, 8, 2), 'male', 'American', 'Passport', 7438903803, 'lawyer', 8675309, 2314839220, 'redacted@gmail.com', 'Pawnee')
] */
// router.get('/', (req, res) => res.json({ data: EntityEmployees }))
const checkTocken = (req, res, next) =>{
  const header = req.headers['authorization']
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]
    req.token = token
    next()
  } else {
    res.sendStatus(403)
  }
}
router.get('/',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey,(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type === 'admin'){
      Admin.find().then((admins) => {
        res.send({ admins })
      }, (err) => {
        res.status(400).send(err)
      })}else{
        res.json({msg: 'You shall not pass'})
      }
    }
  })
})

/* router.post('/', (req, res) => {
  const firstName = req.body.firstName
  const middleName = req.body.middleName
  const lastName = req.body.lastName
  const DOB = req.body.DOB
  const gender = req.body.gender
  const nationality = req.body.nationality
  const typeOfId = req.body.typeOfId
  const Id = req.body.Id
  const jobTitle = req.body.jobTitle
  const mobileNumber = req.body.mobileNumber
  const faxNumber = req.body.faxNumber
  const emailAddress = req.body.emailAddress
  const address = req.body.address

  const schema = {
    firstName: Joi.string().min(3).required(),
    middleName: Joi.string().min(3),
    lastName: Joi.string().min(3).required(),
    DOB: Joi.date().required(),
    gender: Joi.string().required(),
    nationality: Joi.string().min(3).required(),
    typeOfId: Joi.string().required(),
    Id: Joi.string().required(),
    jobTitle: Joi.string().min(3).required(),
    mobileNumber: Joi.number(),
    faxNumber: Joi.number(),
    emailAddress: Joi.string(),
    address: Joi.string().required()
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) return res.status(400).send({ error: result.error.details[0].message })

  const newEntityEmployee = new EntityEmployee(
    firstName,
    middleName,
    lastName,
    DOB,
    gender,
    nationality,
    typeOfId,
    Id,
    jobTitle,
    mobileNumber,
    faxNumber,
    emailAddress,
    address
  )
  EntityEmployees.push(newEntityEmployee)
  return res.json({ data: newEntityEmployee })
}) */


router.post('/',checkTocken ,async (req, res) => {
  jwt.verify(req.token,tokenkey,(err,payload) =>{
    console.log(req.token)
    console.log(tokenkey)
    if(err){
      console.log('error hereeee')
      res.status(403).send(err);
    }else{
      if(payload.type === 'admin'){
      try {
      const isValidated = validator.createValidation(req.body)
      if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      Admin.create(req.body).then((newAdmin) => {
        res.json({ message: 'Admin was created successfully', data: newAdmin })
      }, (err) => { res.status(400).send(err) })
    } catch (error) {
      res.status(400).send({ error: 'Error' })
    }}
    else{
        res.json({msg: 'You shall not pass'})
      }
    }
  })
})
/* router.get('/:id', (req, res) => {
  const EntityEmployeeId = req.params.id
  const EntityEmployeeInstance = EntityEmployees.find(EntityEmployeeX => EntityEmployeeX.id === EntityEmployeeId)
  if (EntityEmployeeInstance === undefined) {
    res.status(404).send({ err: 'Employee not found' })
  } else {
    res.send({ EntityEmployeeInstance })
  }
}) */

router.get('/getCompanys',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey,(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type === 'admin'){
  res.redirect('./../company/')}
  else{
    res.json({msg: 'You shall not pass'})
  }
    }
  })
})

//  search using /api/admin/getCases/
router.get('/getCases',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey,(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type === 'admin'){
         res.redirect('./../cases/')
        }
      else{
          res.json({msg: 'You shall not pass'})
        }
      }
  })
})

router.get('/:id',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey, async (err,payload) =>{
    if(err){
      res.status(403).send(err);
    }
    else{
      if(payload.type === 'admin'){
  try {
    const adminId = payload.id
    const adminInstance = await Admin.findById(adminId)
    if (!adminInstance) {
      res.status(400).send({ error: 'not found' })
    } else {
      res.json({ data: adminInstance })
    }
  } catch (error) {
    res.status(400).send({ error: 'error' })
  }}
  else{res.json({msg: 'You shall not pass'})}
}  
})
})
router.put('/:id',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey, async (err,payload) =>{
    if(err){
      res.status(403).send(err);
    }
    else{
      if(payload.type === 'admin'){
    try {
    const adminId = payload.id
    const adminInstance = await Admin.findById(adminId)
    if (!adminInstance) {
      res.status(404).send({ error: 'not found' })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message })
    }
    await Admin.findByIdAndUpdate(adminId, req.body)
    res.json({ message: 'updated successfuly' })
  } catch (error) {
    res.status(400).send({ error: 'error' })
      }
    }
    else{res.json({msg: 'You shall not pass'})}
  }

  })
})

router.put('/assigncasestomyselftheadmin/:id/',checkTocken ,async (req, res) => {
  jwt.verify(req.token,tokenkey, async (err,payload) =>{
    if(err){
      res.status(403).send(err);
    }
    else{
      if(payload.type === 'admin'){
  try {
    const caseId = req.params.id
    const caseElement = await Case.findById(caseId)
    if (!caseElement) {
      res.status(404).send({ error: 'We can not find what you are looking for' })
    }
    const isValidated = validator.assigncasesadminValidation(req.body)
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message })
    }
    await Case.findByIdAndUpdate(caseId, req.body)
    res.json({ msg: 'Assigned' })
  } catch (error) {
    res.status(400).send({ error: 'Something went wrong' })
  }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})

/* router.put('/:id', (req, res) => {
  const EntityEmployeeId = req.params.id
  const EntityEmployeeInstance = EntityEmployees.find(EntityEmployeeX => EntityEmployeeX.id === EntityEmployeeId)
  if (EntityEmployeeInstance === undefined) {
    res.status(404).send({ err: 'Employee not found' })
  } else {
    const firstName = req.body.firstName
    const middleName = req.body.middleName
    const lastName = req.body.lastName
    const DOB = req.body.DOB
    const gender = req.body.gender
    const nationality = req.body.nationality
    const typeOfId = req.body.typeOfId
    const Id = req.body.Id
    const jobTitle = req.body.jobTitle
    const mobileNumber = req.body.mobileNumber
    const faxNumber = req.body.faxNumber
    const emailAddress = req.body.emailAddress
    const address = req.body.address

    const schema = {
      firstName: Joi.string().min(3),
      middleName: Joi.string().min(3),
      lastName: Joi.string().min(3),
      DOB: Joi.date(),
      gender: Joi.string(),
      nationality: Joi.string().min(3),
      typeOfId: Joi.string(),
      Id: Joi.string(),
      jobTitle: Joi.string().min(3),
      mobileNumber: Joi.number(),
      faxNumber: Joi.number(),
      emailAddress: Joi.string(),
      address: Joi.string()
    }

    const result = Joi.validate(req.body, schema)

    if (result.error) return res.status(400).send({ error: result.error.details[0].message })

    if (firstName) {
      EntityEmployeeInstance.firstName = firstName
    }
    if (middleName) {
      EntityEmployeeInstance.middleName = middleName
    }
    if (lastName) {
      EntityEmployeeInstance.lastName = lastName
    }
    if (DOB) {
      EntityEmployeeInstance.DOB = DOB
    }
    if (gender) {
      EntityEmployeeInstance.gender = gender
    }
    if (nationality) {
      EntityEmployeeInstance.nationality = nationality
    }
    if (typeOfId) {
      EntityEmployeeInstance.typeOfId = typeOfId
    }
    if (Id) {
      EntityEmployeeInstance.Id = Id
    }
    if (jobTitle) {
      EntityEmployeeInstance.jobTitle = jobTitle
    }
    if (mobileNumber) {
      EntityEmployeeInstance.mobileNumber = mobileNumber
    }
    if (faxNumber) {
      EntityEmployeeInstance.faxNumber = faxNumber
    }
    if (emailAddress) {
      EntityEmployeeInstance.emailAddress = emailAddress
    }
    if (address) {
      EntityEmployeeInstance.address = address
    }
    res.json({ data: EntityEmployees })
  }
}) */
router.delete('/:id',checkTocken,async (req, res) => {
  jwt.verify(req.token,tokenkey, async (err,payload) =>{
    if(err){
      res.status(403).send(err);
    }
    else{
      if(payload.type === 'admin'){
  try {
    const adminId = payload.id
    await Admin.findByIdAndRemove(adminId)
    res.json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(404).send({ error: 'error' })
  }
}
else{res.json({msg: 'You shall not pass'})}
}
})
})
// router.delete('/:id', (req, res) => {
/* const EntityEmployeeId = req.params.id
  const EntityEmployeeInstance = EntityEmployees.find(EntityEmployeeX => EntityEmployeeX.id === EntityEmployeeId)
  if (EntityEmployeeInstance === undefined) {
    res.status(404).send({ err: 'Employee not found' })
  } else {
    const index = EntityEmployees.indexOf(EntityEmployeeInstance)
    EntityEmployees.splice(index, 1)
    res.json({ data: EntityEmployees })
  } */
/* let EntityEmployeeid = req.params.id
  let EntityEmployeeIndex = null
  EntityEmployeeIndex = EntityEmployees.findIndex((x) => { return x.id === EntityEmployeeid })
  if (EntityEmployeeIndex === null) {
    return res.sendStatus(400)
  }
  EntityEmployees.splice(EntityEmployeeIndex, 1)
  return res.send('Deleted!')
}) */
/* router.put('/assigncaseslawyer/:id/', async (req, res) => {
  try {
    const caseId = req.params.id
    const caseElement = await Case.findById(caseId)
    if (!caseElement) {
      res.status(404).send({ error: 'We can not find what you are looking for' })
    }
    const isValidated = validator.assignlawyerValidation(req.body)
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message })
    }
    await Case.findByIdAndUpdate(caseId, req.body)
    res.json({ msg: 'Assigned' })
  } catch (error) {
    res.status(400).send({ error: 'Something went wrong' })
  }
})
router.put('/assigncasesreviewer/:id', async (req, res) => {
  try {
    const caseId = req.params.id
    const caseElement = await Case.findById(caseId)
    if (!caseElement) {
      res.status(404).send({ error: 'We can not find what you are looking for' })
    }
    const isValidated = validator.assignreviewerValidation(req.body)
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message })
    }
    const updatedCase = await Case.findByIdAndUpdate(caseId, req.body)
    res.json({ msg: 'update done' })
  } catch (error) {
    res.status(404).send({ error: 'Something went wrong' })
  }
})
router.put('/assigntasks/:id/', async (req, res) => {
  try {
    const taskId = req.params.id
    const taskElement = await Task.findById(taskId)
    if (!taskElement) {
      res.status(404).send({ error: 'We can not find what you are looking for' })
    }
    const isValidated = validator.assigntasksValidation(req.body)
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message })
    }
    await Task.findByIdAndUpdate(taskId, req.body)
    res.json({ msg: 'Assigned' })
  } catch (error) {
    res.status(400).send({ error: 'Something went wrong' })
  }
}) */
router.post('/createlawyer',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey, async (err,payload) =>{
    if(err){
      res.status(403).send(err);
    }
    else{
      if(payload.type === 'admin'){
  res.redirect(307, './../Lawyer')
}
else{res.json({msg: 'You shall not pass'})}
}
})
})
router.post('/createreviewer',checkTocken , async (req, res) => {
  jwt.verify(req.token,tokenkey, async (err,payload) =>{
    if(err){
      res.status(403).send(err);
    }
    else{
      if(payload.type === 'admin'){
  res.redirect(307, './../reviewer')
}
else{res.json({msg: 'You shall not pass'})}
}
})
})
module.exports = router
