const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

const Reviewer = require('../../models/Reviewer');

const reviewers = [new Reviewer('Pablo Escobar','1/1/1999','Male','Colombian','UUID','02091998','09021998','abulletinthedark@gmail.com','21 Medillin Street'),
                    new Reviewer('Tata Escobar','4/3/1999','Female','Colombian','UUID','02091998','09021998','faithfulwife@gmail.com','21 Medillin Street')]

router.get('/', (req,res) => res.json({data: Reviewer}))

router.post('/', (req,res) => {
    const name = req.body.name;
    const birth_date = req.body.birth_date;
    const gender = req.body.gender;
    const nationality = req.body.nationality;
    const type_of_ID = req.body.type_of_ID;
    const mobile_number = req.body.mobile_number;
    const fax_number = req.body.fax_number;
    const email = req.body.email;
    const address = req.body.address;

    const schema = {
        name: Joi.string().required(),
        birth_date: Joi.string().required(),
        gender: Joi.string().required(),
        nationality: Joi.string().required(),
        type_of_ID: Joi.string().required(),
        mobile_number: Joi.string().required(),
        fax_number: Joi.string().required(),
        email: Joi.string().required(),
        address: Joi.string().required()
    }

    const result = Joi.validate(req.body,schema);

    if(result.error) return res.status(400).send({error: result.error.details[0].message})

    const newReviewer = {
        id: uuid.v4(),
        name,
        birth_date,
        gender,
        nationality,
        type_of_ID,
        mobile_number,
        fax_number,
        email,
        address
    }

    reviewers.push(newReviewer)
    return res.json({data: newReviewer});
});

router.get('/:id', (req, res) => {
    const reviewrId = req.params.id
    const reviewerElement = reviewers.find( reviewerX => reviewerX.id = reviewrId)
    if (reviewerElement === undefined){
        res.status(404).send({err: 'Not Found'})}
    else{
        res.send({reviewerElement})
    }    
});

router.put('/:id', (req, res) => {
    const reviewerId = req.params.id
    const reviewerElement = reviewers.find(reviewerX => reviewerX.id === reviewrId)
    if(reviewerElement === undefined){
        res.status(404).send({err: 'Not found'})
    }
    else{
        const name = req.body.name;
        const birth_date = req.body.birth_date;
        const gender = req.body.gender;
        const nationality = req.body.nationality;
        const type_of_ID = req.body.type_of_ID;
        const mobile_number = req.body.mobile_number;
        const fax_number = req.body.fax_number;
        const email = req.body.email;
        const address = req.body.address;
    
        const schema = {
            name: Joi.string().required(),
            birth_date: Joi.string().required(),
            gender: Joi.string().required(),
            nationality: Joi.string().required(),
            type_of_ID: Joi.string().required(),
            mobile_number: Joi.string().required(),
            fax_number: Joi.string().required(),
            email: Joi.string().required(),
            address: Joi.string().required()
        }
    
        const result = Joi.validate(req.body,schema);
    
        if(result.error) return res.status(400).send({error: result.error.details[0].message})

        if(name){
            reviewerElement.name = name;
        }

        if(birth_date){
            reviewerElement.birth_date = birth_date;
        }

        if(gender){
            reviewerElement.gender = gender;
        }

        if(nationality){
            reviewerElement.nationality = nationality
        }

        if(type_of_ID){
            reviewerElement.type_of_ID = type_of_ID;
        }

        if(mobile_number){
            reviewerElement.mobile_number = mobile_number;
        }

        if(fax_number){
            reviewerElement.fax_number = fax_number;
        }

        if(email){
            reviewerElement.email = email;
        }

        if(address){
            reviewerElement.address = address;
        }

        res.json({data: reviewers})
    }
})

router.delete('/:id', (req, res) => {
    reviewrId = req.params.id
    reviewerElement = reviewers.find(reviewerX => reviewerX.id = reviewerId)
    if(reviewerElement === undefined){
        res.status(404).send({err: 'Not found'})
    }
    else{
        const index = reviewers.indexOf(reviewerElement)
        reviewers.splice(index,1)
        res.json({ data: reviewers})
    }
})
module.exports = router;