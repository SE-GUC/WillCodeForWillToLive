const joi = require('joi')
const uuid = require('uuid')

class Form {
  constructor(id,InvestorName,LawyerName,CompanyName,CompanyName_English,CreatedAt,RegulatedLaw,FormOfLegalCompany,Governorate,City,Address,Reviewed,Status)
  {
      _id = uuid.v4();
      this.InvestorName = InvestorName;
      this.LawyerName = LawyerName;
      this.CompanyName = CompanyName;
      this.CompanyName_English = CompanyName_English;
      this.CreatedAt = CreatedAt;
      this.RegulatedLaw = RegulatedLaw;
      this.FormOfLegalCompany = FormOfLegalCompany;
      this.Governorate =  Governorate;
      this.City = City;
      this.Address = Address;
      this.Reviewed = Reviewed;
      this.Status = Status;
  }

    validate(){

        var schema = {
            // TODO:
        }
        var val = joi.validate(schema, this);
        return val.error;
    }
}

module.exports = Form;
