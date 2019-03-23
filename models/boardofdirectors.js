const mongoose = require('mongoose');
const Schema = mongoose.Schema

const boardofdirectorsSchema = new Schema({
    boardOfDirectorsName: {
        type: String,
        required: true
    },
    boardOfDirectorsId: {
        type: Number,
        required: true
    },
    boardOfDirectorsGender: {
        type: String,
        required: true
    },
    boardOfDirectorsNationality: {
        type: String,
        required: true
    },
    
    boardOfDirectorsBirthDate: {
        type: Date,
        required: true
    },
    boardOfDirectorsPosition: {
        type: String,
        required: true
    },
    boardOfDirectorsHomeAddress: {
        type: String,
        required: true
    },
})

module.exports = boarofdirectors = mongoose.model('boardofdirectors', boardofdirectorsSchema)
