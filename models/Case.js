//const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// class Case {
//     constructor(status,investor,reviewer,lawyer,company_name){
//         this.id = uuid.v4();
//         this.status = status;
//         this.investor = investor;
//         this.reviewer = reviewer;
//         this.lawyer = lawyer;
//         this.company_name = company_name;
//     }
// };

const caseSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    status:{
        type: String,
        required: true
    },
    investor:{
        type: String,
        required: true
    },
    reviewer:{
        type: String,
        required: true
    },
    lawyer:{
        type: String,
        required: true
    },
    company_name:{
        type: String,
        required: true
    }
})
module.exports = Case = mongoose.model('Case',caseSchema)
