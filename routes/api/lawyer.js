// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Lawyer = require('../../models/Lawyer');

router.get('/', function(req, res, next) {
  Lawyer.find(function (err, lawyers) {
    if (err) return next(err);
    res.json(lawyers);
  });
});

router.delete('/:id', function(req, res, next) {
  Lawyer.findById(req.params.id, function (err, lawyer) {
    if (err) return next(err);
    res.json(lawyer);
  });
});


router.post('/', function(req, res, next) {
  Lawyer.create(req.body, function (err, lawyer) {
    if (err) return next(err);
    res.json(lawyer);
  });
});

router.put('/:id', function(req, res, next) {
  Lawyer.findByIdAndUpdate(req.params.id, req.body, function (err, lawyer) {
    if (err) return next(err);
    res.json(lawyer);
  });
});

router.delete('/:id', (req, res, next) => {
  Lawyer.findByIdAndRemove(req.params.id, req.body, function (err, deletedLawyer) {
   if (err) return next(err);
   res.json(deletedLawyer);
 });
});

module.exports = router;
