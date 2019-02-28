const joi = require('joi')
const uuid = require('uuid')

class Company{
    constructor(form){ // TODO: Complete company attributes
        this.uuid = uuid.v4();
        this.form = form;
    }

    validate(){
        /*** Validates all data, but not the data in the form object***/
        var schema = {
            // TODO: 
        }
        var val = joi.validate(schema, this);
        return val.error;
    }
}

module.exports = Company;