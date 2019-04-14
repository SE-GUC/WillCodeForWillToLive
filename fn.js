
const functions = {
    sortTaskById : async () => {
        
        const Task = require('./models/Case')
        var Cases = await Task.find()
        Cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)); 
        return Cases
    },

    sortTaskByCreationDate : async () => {
        const cases = require('./models/Case')
        const Cases = await cases.find()
        for(var i = Cases.length - 1; i >= 0; i--){
            var maxTask = Cases[0]
            var ind = 0
            for(var j = 1; j<=i ; j++){
                var currentTask = Cases[j]
                
                if(currentTask.created_at > maxTask.created_at){
                    console.log("ayhaga")
                    maskTask = currentTask
                    ind = j
                }
            }
            var temp = Cases[i]
            Cases[i] = maxTask
            Cases[ind] = temp
        }
        return Cases
    }

   /*createReviewer : async (req) => {
        try{
        console.log({data: req})
        const validator = require('./validations/reviewerValidations')
        const Reviewer = require('./models/Reviewer')
        const isValidated = validator.createValidation(req)
        if(isValidated.error) return res.status(404).send({error: isValidated.error.details[0].message})
        const newReviewer = await Reviewer.create(req)
        var msg = 'Reviewer created successfully'
        return msg
        }
        catch(error){
            return 'Error in reviewer creation'
        }
    }*/
}
module.exports = functions