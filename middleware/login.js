const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Lawyer = require('../models/lawyer')
const Reviewer = require('../models/Reviewer')
const Investor = require('../models/Investor')
const jwt = require('jsonwebtoken')
const tokenkey = require('../config/keys').secretkey

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })
    if (admin) {
      if (admin.password === password) {
        const payload = {
          id: admin._id,
          username: admin.username,
          type: 'admin'
        }
        const token = jwt.sign(payload, tokenkey, { expiresIn: '9999999h' })
        return res.json({ token: `Bearer ${token}` })
      } else {
        res.status(400).send({ error: 'wrong password' })
      }
    } else {
      const lawyer = await Lawyer.findOne({ username })
      if (lawyer) {
        if (lawyer.password === password) {
          const payload = {
            id: lawyer._id,
            username: lawyer.username,
            type: 'lawyer'
          }
          const token = jwt.sign(payload, tokenkey, { expiresIn: '9999999h' })
          return res.json({ token: `Bearer ${token}` })
        } else {
          res.status(400).send({ error: 'wrong password' })
        }
      } else {
        const reviewer = await Reviewer.findOne({ username })
        if (reviewer) {
          if (reviewer.password === password) {
            const payload = {
              id: reviewer._id,
              username: reviewer.username,
              type: 'reviewer'
            }
            const token = jwt.sign(payload, tokenkey, { expiresIn: '9999999h' })
            return res.json({ token: `Bearer ${token}` })
          } else {
            res.status(400).send({ error: 'wrong password' })
          }
        } else {
          const investor = await Investor.findOne({ username })
          if (investor) {
            if (investor.password === password) {
              const payload = {
                id: investor._id,
                username: investor.username,
                type: 'investor'
              }
              const token = jwt.sign(payload, tokenkey, { expiresIn: '9999999h' })
              return res.json({ token: `Bearer ${token}` })
            } else {
              res.status(400).send({ error: 'wrong password' })
            }
          } else {
            return res.status(404).json({ error: 'username does not exist' })
          }
        }
      }
    }
  } catch (e) {
    return res.status(400).json({ error: 'something went wrong' })
  }
})
