const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
//Investor schema
var investorSchema = new Schema({
  email: { type: mongoose.SchemaTypes.Email, unique: true },
  password: String,
  typeOfID: String,
  name: String,
  nationality: String,
  capital: Number,
  birthdate: Date,
  mobileNumber: Number,
  address: String,
  faxNumber: Number,
  gender: {
    type: String,
    enum: ["Male", "Female"]
  }
});

module.exports = Investor = mongoose.model("investors", investorSchema);
