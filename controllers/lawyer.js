const Lawyer = require('../models/lawyer.js')

var lawyerController = {

  async getLawyer(req, res){
    try{
      let lawyer = await Lawyer.getLawyerById(req.params.id)

      if(lawyer){
        res.status(200).json(lawyer)
      }else{
        res.status(404).json({"error": "Lawyer not found."})
      }

    }catch(err){
      return err
    }
  },

  async addLawyer(req, res){
    try{
      if(req.body.name == null){
        res.status(403).json({"error":"Must have name"})
      }
      if(req.body.email_address == null){
        res.status(403).json({"error":"Must have email_address"})
      }
      if(req.body.fax_number == null){
        res.status(403).json({"error":"Must have fax_number"})
      }
      if(req.body.mobile_number == null){
        res.status(403).json({"error":"Must have mobile_number"})
      }
      if(req.body.birth_date == null){
        res.status(403).json({"error":"Must have birth_date"})
      }
      if(req.body.identification == null){
        res.status(403).json({"error":"Must have identification"})
      }
      if(req.body.type_Of_ID == null){
        res.status(403).json({"error":"Must have type_Of_ID"})
      }
      if(req.body.nationality == null){
        res.status(403).json({"error":"Must have nationality"})
      }
      if(req.body.gender == null){
        res.status(403).json({"error":"Must have gender"})
      }

      let newLawyer = await Lawyer.addLawyer(req.body.name, req.body.email_address,req.body.fax_number,req.body.mobile_number,req.body.birth_date,req.body.identification,req.body.type_Of_ID,req.body.nationality,req.body.gender)

      if(newLawyer){
        res.status(200).json(newLawyer)
      }else{
        res.status(404).json({"error":"fail to add"})
      }
    }catch(err){
      return err
    }
  },

  async updateLawyer(req,res){
    try{
      if(req.body.identification == null){
        res.status(403).json({"error":"Must have identification"})
      }
      let new_lawyer = {
        name:req.body.name,
        email_address:req.body.email_address,
        fax_number:req.body.fax_number,
        mobile_number:req.body.mobile_number,
        birth_date:req.body.birth_date,
        identification:req.body.identification,
        type_Of_ID:req.body.type_Of_ID,
        nationality:req.body.nationality,
        gender:req.body.gender,
      };
      let lawyer = await Lawyer.updateLawyer(req.params.id,new_lawyer)
      if(lawyer){
        res.status(200).json(lawyer)
      }else{
        res.status(404).json({"error":"fail to update lawyer"})
      }
    }catch(err){
      return err
    }
  },

  async deleteLawyer(req,res){
    try{
      let lawyer = await Lawyer.deleteLawyer(req.params.id)
      if(lawyer){
          res.status(200).json(lawyer)
      }else{
          res.status(404).json({"error":"failed to delete"})
      }
    }catch(err){
      return err
    }
  },
}

module.exports = lawyerController
