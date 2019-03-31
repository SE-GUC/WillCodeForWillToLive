const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
//Investor schema
var investorSchema = new Schema({
  email: { type: mongoose.SchemaTypes.Email },
  username: { type: String, required: true, unique: true },
  password: String,
  typeOfID: String,
  name: String,
  nationality: String,
  capital: Number,
  DOB: Date,
  mobileNumber: Number,
  address: String,
  faxNumber: Number,
  gender: {
    type: String,
    enum: ["Male", "Female"]
  }
});

module.exports = Investor = mongoose.model("investors", investorSchema);
