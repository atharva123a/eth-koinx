const express = require('express');

const router = express.Router();

const { getAllTransactions, getAccountBalance } = require('../controllers/accountController');

router.post('/', getAccountBalance)
router.get('/:id', getAllTransactions)

module.exports = router;