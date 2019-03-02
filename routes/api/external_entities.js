const Joi = require('joi');
const express = require('express');
const app = express.Router();


const ExternalEntity=[
    {id : 1, name: "Mike", emailAddress:"mike123@gmail.com", nationality:"American", typeofID:"double", mobileNumber:"12341235234",faxNumber:"6322346234", address:"Street 17"},
    {id : 2, name: "Ryan", emailAddress:"ryanRRR@gmail.com", nationality:"Canadian", typeofID:"double", mobileNumber:"62346234643",faxNumber:"1458515345", address:"Street 56"}
]

app.get('/', (req, res) => {
    res.send(ExternalEntity);
});

app.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: ExternalEntity[ExternalEntity.length-1].id +1,
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
    if(!course) return res.status(404).send('the External-Entity was not found');
            
    if(req.body.name != null){
        course.name = req.body.name;
    }
    if(req.body.emailAddress != null){
        course.emailAddress = req.body.emailAddress;
    }
    if(req.body.nationality != null){
        course.nationality = req.body.nationality;
    }
    if(req.body.typeofID != null){
        course.typeofID = req.body.typeofID;
    }
    if(req.body.mobileNumber != null){
        course.mobileNumber = req.body.mobileNumber;
    }
    if(req.body.faxNumber != null){
        course.faxNumber = req.body.faxNumber;
    }
    if(req.body.address != null){
        course.address = req.body.address;
    }
    res.send(course);
});


app.delete('/:id', (req, res) => {
    const course = ExternalEntity.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the External-Entity was not found');

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
