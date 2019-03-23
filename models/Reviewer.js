//const uuid = require('uuid');

/* class Reviewer{
    constructor(name, birth_date, gender, nationality, type_of_ID, mobile_number, fax_number, email, address){
    this.ID = uuid.v4();
    this.name = name;
    this.birth_date = birth_date;
    this.gender = gender;
    this.nationallity = nationality;
    this.type_of_ID = type_of_ID;
    this.ID = uuid.v4();
    this.mobile_number = mobile_number;
    this.fax_number = fax_number;
    this.email = email;
    this.address = address;
    }
}*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewerSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    birth_date: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    
    nationallity: {
        type: String,
        required: true
    },

    type_of_ID: {
        type: String,
        required: true
    },

    mobile_number: {
        type: String,
        required: true
    },

    fax_number: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    }

})

//module.exports = Reviewer
module.exports = Reviewer = mongoose.model('reviewer', ReviewerSchema)