// const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
/* class admin {
  constructor (username, password, firstName, middleName, lastName, DOB, gender, nationality, typeOfId, Id, jobTitle, mobileNumber, faxNumber, emailAddress, address) {
    this.id = uuid.v4()
    this.username=username
    this.password=password
    this.firstName = firstName
    this.middleName = middleName
    this.lastName = lastName
    this.DOB = DOB
    this.gender = gender
    this.nationality = nationality
    this.typeOfId = typeOfId
    this.Id = Id
    this.jobTitle = jobTitle
    this.mobileNumber = mobileNumber
    this.faxNumber = faxNumber
    this.emailAddress = emailAddress
    this.address = address
  };
} */
let adminSchema = new Schema({
  username: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: true, max: 100 },
  firstName: { type: String, required: true, max: 100 },
  middleName: { type: String, required: false, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  DOB: { type: String, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  faxNumber: { type: Number, required: false },
  emailAddress: { type: String, required: false },
  address: { type: String, required: false }
})
module.exports = Admin = mongoose.model('Admin', adminSchema)
// module.exports = admin
