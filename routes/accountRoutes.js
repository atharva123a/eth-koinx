const express = require('express');

const router = express.Router();

const { getAllTransactions, getAccountBalance } = require('../controllers/accountController');

router.get('/:address', getAccountBalance)
router.get('/transactions/:id', getAllTransactions)

module.exports = router;