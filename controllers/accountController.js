const { StatusCodes } = require("http-status-codes");
const Web3 = require("web3");
const { BadRequestError, NotFoundError } = require('../errors')
const Account = require('../models/Account');
const { getRequest } = require('etherscan-api')

const api = require('etherscan-api').init(process.env.API_KEY);

const getAccountBalance = async (req, res) => {
    const { address } = req.body;

    if (!address) {
        throw new BadRequestError('Please provide address!');
    }

    const balance = await api.account.balance(address);

    const etherValue = Web3.utils.fromWei(balance.result, 'ether');

    const account = await Account.findOne({ account: address });
    if (!account) {
        const data = await Account.create({ account: address, balance: etherValue })
        return res.status(200).json({ success: true, data })
    }

    account.balance = etherValue;

    await account.save();

    return res.status(200).json({ success: true, data: account })

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

    return res.status(200).json({ success: true, data: account })
}

module.exports = { getAccountBalance, getAllTransactions }