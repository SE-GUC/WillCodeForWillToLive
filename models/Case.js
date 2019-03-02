const uuid = require('uuid')

class Case {
    constructor(status,investor,reviewer,lawyer,company_name){
        this.id = uuid.v4();
        this.status = status;
        this.investor = investor;
        this.reviewer = reviewer;
        this.lawyer = lawyer;
        this.company_name = company_name;
    }
};
module.exports = Case
