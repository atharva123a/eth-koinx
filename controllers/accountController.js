const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors')
const Account = require('../models/Account');
const Convert = require("../models/Convert");

const api = require('etherscan-api').init(process.env.API_KEY);

const getAccountBalance = async (req, res) => {
    const address = req.params.address;

    if (!address) {
        throw new BadRequestError('Please provide address!');
    }

    const { convert: etherValue } = await Convert.findOne({ from: 'ethereum', to: "inr" })

    const account = await Account.findOne({ account: address });
    if (!account) {
        throw new BadRequestError(`No account find with address: ${address}!`);
    }

    let balance = 0.0;

    account.transactions.forEach((transaction) => {
        if (transaction.from == address) {
            balance -= parseFloat(transaction.value)
        }
        else if (transaction.to == address) {
            balance += parseFloat(transaction.value)
        }
    })

    account.balance = balance;

    await account.save();

    let currentBalance = account.balance + 'eth';
    let currentEthPrice = etherValue

    let data = { currentBalance, currentEthPrice }

    return res.status(200).json({ success: true, data })

}


const getAllTransactions = async (req, res) => {
    const address = req.params.id;

    if (!address) {
        throw new BadRequestError('Please provide address!');
    }

    let account = await Account.findOne({ account: address });

    if (!account) {
        account = await Account.create({ account: address })
    }

    const txlist = await api.account.txlist('0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC', 1, 'latest', 1, 100, 'asc');


    const { result } = txlist;

    account.transactions = result;

    await account.save()

    return res.status(200).json({ success: true, transactions: account.transactions })
}

module.exports = { getAccountBalance, getAllTransactions }