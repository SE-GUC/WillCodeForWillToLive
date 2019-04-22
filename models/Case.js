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
        type: String
    },
    lawyer:{
        type: String
    },
    company_name:{
        type: String,
        required: true
    },
    reviewed_by_lawyer: {
        type: Boolean,
        required: true
    },
    review_comment_by_lawyer: {
        type: String,
        required: false
    },
    review_date_by_lawyer: {
        type: Date,
        required: false
    },
    reviewed_by_reviewer: {
        type: Boolean,
        required: true
    },
    review_comment_by_reviewer: {
        type: String,
        required: false
    },
    review_date_by_reviewer: {
        type: Date,
        required: false
    },
    fees: {
       type: Number,
       required: false
   },
    paid: {
        type: Boolean,
        required: false,
        default: false
    },
    currency: {
        type: String,
        required: false
    },
    formID: {
        type: String,
        required: false
    },
    priority: {
        type : String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    created_at: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: false
    }
})
module.exports = Case = mongoose.model('Case',caseSchema)
