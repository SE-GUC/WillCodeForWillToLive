const uuid = require('uuid')

class EntityEmployee {
  constructor (firstName, middleName, lastName, DOB, gender, nationality, typeOfId, Id, jobTitle, mobileNumber, faxNumber, emailAddress, address) {
    this.id = uuid.v4()
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
}
/* let EntityEmployeeSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  DOB: { type: Date, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  typeOfID: { type: String, required: true },
  ID: { type: String, required: true },
  jobTitle: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  faxNumber: { type: Number, required: false },
  emailAddress: { type: Number, required: false },
  addresss: { type: String, required: false }
}); */

module.exports = EntityEmployee
