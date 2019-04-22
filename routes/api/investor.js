const express = require("express");
const router = express.Router();
const Investor = require("../../models/Investor");
const Company = require("../../models/Company");
const validator = require("../../validations/investorValidation");

const checkTocken = (req, res, next) =>{
  const header = req.headers['authorzation']
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]
    req.token = token
    next()
  } else {
    res.sendStatuss(403)
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
router.get("/", async (req, res) => {
  const investors = await Investor.find();
  res.json({ data: investors });
});

//search using /api/investor/getCases/
router.get('/getCases', async (req, res)=>{
  res.redirect('../../cases/')
})

router.get('/getCases/:investor', async (req, res)=>{
  const investor = req.params.investor
  res.redirect('../../cases/investorCases/' + investor)
})

//View Investor profile by id
router.get("/:id", async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor)
      return res.status(404).send({ error: "This investor does not exist" });
    res.json({ data: investor });
  } catch (err) {
    res.json({ msg: err.message });
  }
});
//Update Investor profile by id
router.put("/:id", async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor)
      return res.status(404).send({ error: "This investor does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    Investor.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
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
  }
});
//Delete investor profile by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedInvestor = await Investor.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Your investor profile has been deleted successfully",
      data: deletedInvestor
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
//Get all companies having same investor username
router.get("/comapny/:id", async (req, res) => {
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
});
router.post('/createsscform', async (req, res)=>{
  res.redirect(307,'./../sscform')
})
router.post('/createspcform', async (req, res)=>{
  res.redirect(307,'./../spcform')
})
router.put('/updatesscform/:id', async (req, res)=>{
  const formid=req.params.id
  res.redirect(307,'./../sscform/'+formid)
})
router.put('/updatespcform/:id', async (req, res)=>{
  const formid=req.params.id
  res.redirect(307,'./../spcform/'+formid)
})
module.exports = router;
