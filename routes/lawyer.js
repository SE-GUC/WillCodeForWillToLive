const express = require('express');
const router = express.Router();

const lawyerController = require('../controllers/lawyer.js')

router.get('/:id', lawyerController.getLawyer);
router.post('/add', lawyerController.addLawyer);
router.delete('/:id', lawyerController.deleteLawyer);
router.put('/:id', lawyerController.updateLawyer);
module.exports = router;
