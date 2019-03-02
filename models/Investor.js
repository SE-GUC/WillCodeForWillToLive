const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Investor schema
var investorSchema = new Schema({
    name:{
        type: String,
        
    },
    gender:{
        type: String,
        
    },
    nationality:{
        type: String,
        
    },
    typeOfID:{
        type: String,
        
    },
    
    capital:{
        type: Number,
        
    },
    birthdate:{
        type: Date,
        default: Date.now
    },
    email:{
        type:String,
        unique:true
    },
    mobileNumber:{
        type:Number,
        default:null
    },
    address:{
        type:String,
    },
    faxNumber:{
        type:Number,
        default:null
    },
    
});

module.exports = Investor = mongoose.model('investors', investorSchema)