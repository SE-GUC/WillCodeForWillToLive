const mongoose = require('mongoose');
const Schema = mongoose.Schema


const SpcFormSchema = new Schema({
    regulatingLaw: {
        type: String,
        required: true
    },
    companyLegalForm: {
        type: String,
        required: true
    },
    companyName: {
        arabic: {
            type: String,
            required: true
        },
        english: {
            type: String
        }
    },
    hqInfo: {
        governorate: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        telephone: {
            type: String
        },
        fax: {
            type: String
        }
    },
    investorInfo: {
        capitalCurrency: {
            type: String,
            required: true
        },
        capital: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        investorType: {
            type: String,
            required: true
        },
        gender: {
            type: String
        },
        nationality: {
            type: String,
            required: true
        },
        idType: {
            type: String
        },
        idNumber: {
            type: String
        },
        birthDate: {
            type: Date
        },
        address: {
            type: String,
            required: true
        },
        telephone: {
            type: String
        },
        fax: {
            type: String
        },
        email: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = SpcForm = mongoose.model('SpcForm', SpcFormSchema)