
class ExternalEntity {
    constructor(ID, name, emailAddress, nationality, typeofID, mobileNumber, faxNumber, address) {
        this.ID = ID;
        this.name = name;
        this.emailAddress = emailAddress;
        this.nationality = nationality;
        this.typeofID = typeofID;
        this.mobileNumber = mobileNumber;
        this.faxNumber = faxNumber;
        this.address = address;
    };
}

module.exports = ExternalEntity