const express = require("express");
const router = express.Router();
const Investor = require("../../models/Investor");
const Company = require("../../models/Company");
const validator = require("../../validations/investorValidation");
const jwt = require('jsonwebtoken');
const tokenkey = require('../../config/keys').secretkey


// const checkTocken = (req, res, next) =>{
//   const header = req.headers['authorzation']
//   if (typeof header !== 'undefined') {
//     const bearer = header.split(' ')
//     const token = bearer[1]
//     req.token = token
//     next()
//   } else {
//     res.sendStatuss(403)
//   }
// }

const checkTocken = (req, res, next) =>{
  const header = req.headers['authorization']
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]
    req.token = token
    next()
  } else {
    res.sendStatus(403)
  }
}


//create Investor profile
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newInvestor = await Investor.create(req.body);
    res.json({
      msg: "Your Investor profile was created successfully",
      data: newInvestor
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});


//view Investor profiles

router.get('/',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey,(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type === 'investor'){
      Investor.find().then((investors) => {
        res.send({ investors })
      }, (err) => {
        res.status(400).send(err)
      })}else{
        res.json({msg: 'You shall not pass'})
      }
    }
  })
})



// router.get('/', async (req, res) => {
//       Investor.find().then((investors) => {
//         res.send({ investors })
//       }, (err) => {
//         res.status(400).send(err)
//       })
// })



// router.get("/",checkTocken, async (req, res) => {
//   const investors = await Investor.find();
//   res.json({ data: investors });
// });

//search using /api/investor/getCases/
// router.get('/getCases', async (req, res)=>{
//   res.redirect('../../cases/')
// })

router.get('/getCases', checkTocken, async (req, res)=>{
  jwt.verify(req.token,tokenkey,(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type === 'investor'){
        res.redirect('../../cases/')
      }else{
        res.json({msg: 'You shall not pass'})
      }
    }
  })
})


router.get('/getCases:investor',checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey,(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type === 'investor'){
        const investor = payload.investor
        res.redirect('../../cases/investorCases/' + investor)
      }else{
        res.json({msg: 'You shall not pass'})
      }
    }
  })
})








//View Investor profile by id
router.get("/:id",checkTocken, async (req, res) => {
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor)
      return res.status(404).send({ error: "This investor does not exist" });
    res.json({ data: investor });
  } catch (err) {
    res.json({ msg: err.message });
  }
}else{
  res.json({msg: 'You shall not pass'})
}
}
})
});
//Update Investor profile by id
router.put("/:id", checkTocken,async (req, res) => {
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  try {
    const investor = await Investor.findById(payload.id);
    if (!investor)
      return res.status(404).send({ error: "This investor does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    Investor.findByIdAndUpdate(payload.id, req.body, { new: true }, function(
      err,
      updatedInvestor
    ) {
      if (!err)
        res.json({
          msg: "Your investor profile has been updated successfully",
          data: updatedInvestor
        });
      else res.json({ msg: err.message });
    });
  } catch (error) {
    res.json({ msg: error.message });
  }}else{
    res.json({msg: 'You shall not pass'})
  }
}
})
});
//Delete investor profile by id
router.delete("/:id", checkTocken,async (req, res) => {
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  try {
    const deletedInvestor = await Investor.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your investor profile has been deleted successfully",
      data: deletedInvestor
    });
  } catch (error) {
    res.json({ msg: error.message });
  }}else{
    res.json({msg: 'You shall not pass'})
  }
}
})
});
//Get all companies having same investor username
router.get("/comapny/:id", checkTocken,async (req, res) => {
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  try {
    Investor.findById(req.params.id, function (err, investor) {
      if (!err) {
        Company.find({
          investorName: investor.username
          },
          function (err, companies) {
            if (!err)
              res.json({
                msg: "Here are your companies",
                data: companies
              });
            else res.json({
              msg: err.message
            });
          });
      } else res.json({
        msg: err.message
      });
    });
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
}else{
  res.json({msg: 'You shall not pass'})
}
}
})
});
router.post('/createsscform', checkTocken,async (req, res)=>{
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  res.redirect(307,'./../sscform')
}else{
  res.json({msg: 'You shall not pass'})
}
}
})})
router.post('/createspcform', checkTocken,async (req, res)=>{
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  res.redirect(307,'./../spcform')}else{
    res.json({msg: 'You shall not pass'})
  }
}
})
})
router.put('/updatesscform/:id', checkTocken,async (req, res)=>{
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  const formid=req.params.id
  res.redirect(307,'./../sscform/'+formid)}else{
    res.json({msg: 'You shall not pass'})
  }
}
})
})
router.put('/updatespcform/:id', checkTocken,async (req, res)=>{
  jwt.verify(req.token,tokenkey,async(err,payload) =>{
    if(err){
      res.status(403).send(err);
    }else{
      if(payload.type ==='investor'){
  const formid=req.params.id
  res.redirect(307,'./../spcform/'+formid)}else{
    res.json({msg: 'You shall not pass'})
  }
}
})
})
module.exports = router;
