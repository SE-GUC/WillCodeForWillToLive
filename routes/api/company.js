const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const schema = require('../../models/Company')
const config = require('../../config/keys')

const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const mongoURL = config.mongoURI
mongoose.set('useCreateIndex', true)

/*** CRUD implementation ***/
router.post('/', (req, res)=>{
    mongoose.connect(mongoURL, {useNewParser: true}).then(()=>{
        schema.insertMany([req.body]).then(()=>{
            return res.redirect('/api/company/')
        }).catch((error)=>{
            mongoose.disconnect()
            return res.send(error)
        })
    }).catch((error)=>{
        console.log('There')
        mongoose.disconnect()
        return res.send(error)
    })
})

// Show all data
router.get('/', async (req, res)=>{
    mongoose.connect(mongoURL).then(()=>{
        schema.find({}).then((companies)=>{
            return res.send({data: companies})
        }).catch((error)=>{
            mongoose.disconnect()
            return res.send(`Error: ${error}.`)
        })
    }).catch((error)=>{
        mongoose.disconnect()
        return res.send(`Error: ${error}.`)
    })
})

// Reading entry
router.get('/:id', (req, res)=>{
    mongoose.connect(mongoURL).then(()=>{
        schema.findOne({'_id': req.params.id})
        .exec()
        .then((company)=>{
            return res.send({data:company})
        }).catch((error)=>{
            mongoose.disconnect()
            return res.send(`Error: ${error}.`)
        })
    }).catch((error)=>{
        mongoose.disconnect()
        return res.send(`Error: ${error}.`)
    })
})

// Updating
router.put('/:id', (req, res)=>{
    mongoose.connect(mongoURL)
    .then(()=>{
        schema.findOneAndUpdate({'_id':req.params.id}, req.body)
        .exec()
        .then(()=>{
            return res.redirect('/api/company/')
        }).catch((error)=>{
            mongoose.disconnect()
            return res.send(`Error: ${error}.`)
        })
    }).catch((error)=>{
        mongoose.disconnect()
        return res.send(`Error: ${error}.`)
    })
})

// Deleting data
router.delete('/:id', (req, res)=>{
    mongoose.connect(mongoURL)
    .then(()=>{
        schema.deleteOne({'_id':req.params.id})
        .exec()
        .then(()=>{
            return res.redirect('/api/company')
        }).catch((error)=>{
            mongoose.disconnect()
            return res.send(`Error: ${error}.`)
        })
    }).catch((error)=>{
        mongoose.disconnect()
        return res.send(`Error: ${error}.`)
    })
})

//Exporting router
module.exports = router
