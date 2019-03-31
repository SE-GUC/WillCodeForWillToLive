const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    regulatingLaw: {
        type: [String],
        required: true,
        default: ['Law159', 'Law72']
    },
    companyLegalForm: {
        type: [String],
        required: true,
        default: ['SSC', 'SPC']
    },
    governorate: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            city: [{
                type: String,
                required: true
            }],
        }],
        default: [{
            name: 'Cairo',
            city: ['October', 'Zayed', 'Tagamou\'']
        }, {
            name: 'Alexandria',
            city: ['Abo Queer', 'Montazah']
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
    investoryNationality: {
        type: [String],
        default: ['Egyptian', 'Other']
    },
    investorType: {
        type: [String],
        default: ['person']
    },
    idType: {
        type: [String],
        default: ['nationalID']
    },
    position: {
        type: [String],
        default: ['CEO', 'COO']
    }
})

schema.statics = {
    getSingleton: async function getSingleton() {
        const model = await this.findOne()
        if(model === null) {
            return await new Model().save()
        } else {
            return model
        }
    }
}

const Model = mongoose.model('sscProps', schema)
module.exports = Model