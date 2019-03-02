const uuid = require('uuid');

class Reviewer{
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
}

module.exports = Reviewer