const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExternalEntitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    typeofID: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    faxNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = ExternalEntity = mongoose.model('externalEntitys', ExternalEntitySchema)

//old express code

// class ExternalEntity {
//     constructor(ID, name, emailAddress, nationality, typeofID, mobileNumber, faxNumber, address) {
//         this.ID = ID;
//         this.name = name;
//         this.emailAddress = emailAddress;
//         this.nationality = nationality;
//         this.typeofID = typeofID;
//         this.mobileNumber = mobileNumber;
//         this.faxNumber = faxNumber;
//         this.address = address;
//     };
// }

// module.exports = ExternalEntity