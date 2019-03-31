const mongoose = require('mongoose')
const Schema = mongoose.Schema

const caseSchema = new Schema({
    status:{
        type: String,
        required: true
    },
    investor:{
        type: String,
        required: true
    },
    reviewer:{
        type: String,
        required: true
    },
    lawyer:{
        type: String,
        required: true
    },
    company_name:{
        type: String,
        required: true
    }
})
module.exports = Case = mongoose.model('Case',caseSchema)
