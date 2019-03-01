const Joi = require('joi');
const express = require('express');
const app = express.Router();


const ExternalEntity=[

]

app.get('/', (req, res) => {
    res.send(ExternalEntity);
});

app.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: ExternalEntity.length + 1,
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        nationality: req.body.nationality,
        typeofID: req.body.typeofID,
        mobileNumber: req.body.mobileNumber,
        faxNumber: req.body.faxNumber,
        address: req.body.address
    };
    ExternalEntity.push(course);
    res.send(course);
});


app.put('/:id', (req, res) =>{
    const course = ExternalEntity.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course was not found');
    
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        

    course.name = req.body.name;
    course.emailAddress = req.body.emailAddress;
    course.nationality = req.body.nationality;
    course.typeofID = req.body.typeofID
    course.mobileNumber = req.body.mobileNumber;
    course.faxNumber = req.body.faxNumber;
    course.address = req.body.address;
    res.send(course);
});


app.delete('/:id', (req, res) => {
    const course = ExternalEntity.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course was not found');

    const index = ExternalEntity.indexOf(course);
    ExternalEntity.splice(index, 1);

    res.send(course);

})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required(),
        emailAddress: Joi.string().min(3).required(),
        nationality: Joi.string().min(3).required(),
        typeofID: Joi.string().min(3).required(),
        mobileNumber: Joi.string().min(3).required(),
        faxNumber: Joi.string().min(3).required(),
        address: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.get('/:id', (req, res) => {
  const course = ExternalEntity.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('the course was not found');
  res.send(course);
});

module.exports=app