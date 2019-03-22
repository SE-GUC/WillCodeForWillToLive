const express = require("express");
const router = express.Router();
const Investor = require("../../models/Investor");
const validator = require("../../validations/investorValidations");
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
module.exports = router;
