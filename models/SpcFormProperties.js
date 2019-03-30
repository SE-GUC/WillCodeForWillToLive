const mongoose = require('mongoose');
const Schema = mongoose.schema

const SpcFormSchema = new Schema({
    
    regulatingLaws: [{
        type: String,
        required: true,
        default: ['Law159', 'Law72']
    }],
    companyLegalForm: [{
        type: String,
        required: true,
        default: ['SSC', 'SPC']
    }],
    governorates: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            cities: [{
                type: String,
                required: true
            }],
        }],
        default: [{
            name: 'Cairo',
            cities: ['October', 'Zayed', 'Tagamo3']
        }, {
            name: 'Alexandria',
            cities: ['Abo Queer', 'Montazah']
        }]
    },
    capitalCurrency: {
        type: [{
            type: String,
            required: true
        }],
        default: ['EGP']
    },
    minimumCapital: {
        type: Number,
        default: 50000
    },
    investorType: {
        type: [String],
        default: ['person']
    },
    idType: {
        type: [String],
        default: ['nationalID']
    },
    
})

schema.statics = {
    getSingleton: function getSingleton(cb) {
        this.findOne()
            .exec(function (error, model) {
                if (error) {
                    cb(error, null)
                } else if (model === null) {
                    cb(error, new UserConfig())
                } else {
                    cb(error, model)
                }
            })
    }
}

const Model = mongoose.model('SpcFormProperties', schema)
module.exports = Model
