
const uuid = require('uuid');

class Investor{
    constructor(name, gender, nationality, typeOfID, Id, capital, DOB, emailAddress, mobileNumber, address, faxNumber){
    this.name=name
    this.gender= gender
    this.nationality=nationality
    this.typeOfID= typeOfID
    this.Id=Id
    this.capital=capital
    this.DOB=DOB
    this.emailAddress=emailAddress
    this.mobileNumber=mobileNumber
    this.address=address
    this.faxNumber=faxNumber

    };
};
 module.exports =Investor
