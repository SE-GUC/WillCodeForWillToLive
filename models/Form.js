const mongoose = require('mongoose')

const schema = {
  type: [{
    name: {type: String, required: true},
    value: {type: String, required: true}
  }]
}

module.exports = mongoose.model('Form', schema)
