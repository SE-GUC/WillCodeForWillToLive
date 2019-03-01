
const express = require("express");
const bodyParser = require("body-parser");
const joi = require("joi");
const uuid = require('uuid');


const form = require('../../models/form');

const dataSource = [
  {uuid: 12},
];
const router = express.Router();

router.use(bodyParser.json());

const Forms = [new Form(67,'John','Lennon','Company1','Company1',new Date(1998,6, 9),'law22 section 3','idk','Cairo','Egypt','1street69Maadi',false,true), 
               new Form(68,'Syd','Barett','Company2','Company2',new Date(1998,7, 7),'law77 section 9','idk','Cairo','Egypt','78street8Remaya',false,true),
               new Form(69,'Curt','Kobain','Company3','Company3',new Date(1998,8, 8),'law99 section 12','idk','Cairo','Egypt','251street7Dokki',false,true)
];

router.get('/', (req, res) => res.json({ data: Forms }));

router.post('/', (req, res) => {
    const id = req.body.FormId;
    const InvestorName = req.body.investorName;
    const LawyerName = req.body.lawyerName;
    const CompanyName = req.body.companyName;
    const CompanyName_English = req.body.CompanyName_English;
    const CreatedAt = req.body.CreatedAt;
    const RegulatedLaw = req.body.RegulatedLaw;
    const FormOfLegalCompany = req.body.FormOfLegalCompany;
    const Governorate = req.body.Governorate;
    const City = req.body.City;
    const Address = req.body.Address;
    const Reviewed = req.body.Reviewed;
    const Status = req.body.Status;


    const schema = {
        id: Joi.number().required(),
        InvestorName: Joi.string().min(3).required(),
        LawyerName: Joi.string().min(3).required(),
        CompanyName: Joi.string().required(),
        CompanyName_English: Joi.string(),
        CreatedAt: Joi.date().required(),
        RegulatedLaw: Joi.string().required(),
        FormOfLegalCompany: Joi.string().required(),
        Governorate: Joi.string().required(),
        City: Joi.string().required(),
        Address: Joi.string().required(),
        Reviewed: Joi.boolean().invalid(false),
        Status: Joi.boolean().invalid(false)
      }
      
const result = Joi.validate(req.body,schema);

if (result.error) return res.status(400).send({ error: result.error.details[0].message })

const newForm = {
    id: uuid.v4(),
    InvestorName,
    LawyerName,
    CompanyName,
    CompanyName_English,
    CreatedAt,
    RegulatedLaw,
    FormOfLegalCompany,
    Governorate,
    City,
    Address,
    Reviewed,
    Status
}
Forms.push(newForm)
return res.json({data: newForm});
});

router.get('/:id', (req, res)=>{
    const FormId = req.params.id
    const FormElement = Forms.find(FormX => FormX.id == FormId)
    if(FormElement === undefined){
        res.status(404).send({err: 'Form Not Found'});
    }
    else{
    res.send({FormElement})}
});

router.put('/:id', (req, res) => {  
    const FormId = req.params.id
    const FormElement = Form.find(FormX => FormX.id === FormId)
    if(FormElement === undefined){
        res.status(404).send({err: 'Form  Not found'});
    }
    else{
        const id = req.body.FormId;
        const InvestorName = req.body.investorName;
        const LawyerName = req.body.lawyerName;
        const CompanyName = req.body.companyName;
        const CompanyName_English = req.body.CompanyName_English;
        const CreatedAt = req.body.CreatedAt;
        const RegulatedLaw = req.body.RegulatedLaw;
        const FormOfLegalCompany = req.body.FormOfLegalCompany;
        const Governorate = req.body.Governorate;
        const City = req.body.City;
        const Address = req.body.Address;
        const Reviewed = req.body.Reviewed;
        const Status = req.body.Status;
    
    
    const schema={
        id: Joi.number().required(),
        InvestorName: Joi.string().min(3).required(),
        LawyerName: Joi.string().min(3).required(),
        CompanyName: Joi.string().required(),
        CompanyName_English: Joi.string(),
        CreatedAt: Joi.date().required(),
        RegulatedLaw: Joi.string().required(),
        FormOfLegalCompany: Joi.string().required(),
        Governorate: Joi.string().required(),
        City: Joi.string().required(),
        Address: Joi.string().required(),
        Reviewed: Joi.boolean().invalid(false),
        Status: Joi.boolean().invalid(false)
    }
   
const result = Joi.validate(req.body,schema);
if (result.error) return res.status(400).send({ error: result.error.details[0].message })

if (id) {
  FormInstance.id = id
}
if (InvestorName) {
    FormInstance.InvestorName = InvestorName
  }
  if (LawyerName) {
    FormInstance.LawyerName = LawyerName
  }
  if (CompanyName) {
    FormInstance.CompanyName = CompanyName
  }
  if (CompanyName_English) {
    FormInstance.CompanyName_English = CompanyName_English
  }
  if (CreatedAt) {
    FormInstance.CreatedAt = CreatedAt
  }
  if (RegulatedLaw) {
    FormInstance.RegulatedLaw = RegulatedLaw
  }
  if (FormOfLegalCompany) {
    FormInstance.FormOfLegalCompany = FormOfLegalCompany
  }
  if (Governorate) {
    FormInstance.Governorate = Governorate
  }
  if (City) {
    FormInstance.City = City
  }
  if (Address) {
    FormInstance.Address = Address
  }
  if (Reviewed) {
    FormInstance.Reviewed = Reviewed
  }
  if (Status) {
    FormInstance.Status = Status
  }
res.json({ data: Form })
}
})
router.delete('/:id',(req,res)=>{
    const FormId = req.params.id
    const FormElement = Forms.find(FormX => FormX.id=== FormId)
    if(FormElement === undefined){
        res.status(404).send({err: 'Form Not Found'});
    }
    else{
    const index = Forms.indexOf(FormElement)
    Forms.splice(index,1)
    res.json({ data: Forms })}
})
module.exports = router