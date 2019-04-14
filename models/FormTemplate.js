const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    formNameArabic: {type: String, required: true},
    formNameEnglish: {type: String, required: true},
    fields: [{
        fieldType: {type: String, required: true},
        nameArabic: {type: String, required: true},
        nameEnglish: {type: String, required: true},
        required: {type: Boolean, required: true},
        constraints: [{
            name: {type: String, required: true},
            value: {type: String, required: true}
        }]
    }]
})

module.exports = mongoose.model('formTemplate', schema)