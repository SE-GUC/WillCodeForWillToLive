var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define Lawyer model
var lawyerSchema = new Schema({
    name:String,
    birth_date:Number,
    gender:String,
    nationality:String,
    type_Of_ID:String,
    identification:Number,
    mobile_number:String,
    fax_number:Number,
    email_address:String,
})


var Lawyer = module.exports = mongoose.model('Lawyer', lawyerSchema);

module.exports.getLawyerById = async(id) => {
  try{
    let lawyer = await Lawyer.findById(id)
    return lawyer
  }catch(err){
    throw err
  }
}

module.exports.addLawyer = async(name, email_address,fax_number,mobile_number,birth_date,identification,type_Of_id,nationality,gender) => {
  try{
    let lawyer = new Lawyer({
      name:name,
      birth_date:birth_date,
      gender:gender,
      nationality:nationality,
      type_Of_ID:type_Of_id,
      identification:identification,
      mobile_number:mobile_number,
      fax_number:fax_number,
      email_address:email_address,
    })
    let newLawyer = await lawyer.save()
    return newLawyer
  }catch(err){
    throw err
  }
}

module.exports.updateLawyer = async(id, lawyer) => {
  try{
    let updatedLawyer = await Lawyer.findOneAndUpdate({
      _id:id

    },{
      $set:lawyer
    },{
      new: true,
      upsert: false
    })
    let updtLawyer = await updatedLawyer.save()
    return updtLawyer
  }catch(err){
    throw err
  }
}

module.exports.deleteLawyer = async(id) => {
  try{
    let deletedLawyer = await Lawyer.findByIdAndRemove(id)
    return deletedLawyer
  }catch(err){
    throw err
  }
}
