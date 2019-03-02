const uuid = require('uuid')

class Task{
    constructor(priority, description, created_at, isDone){
        this.ID = uuid.v4();
        this.priority = priority;
        this.description = description;
        this.created_at = created_at;
        this.isDone = isDone;
    } 
}

module.exports = Task