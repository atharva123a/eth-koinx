const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    transactions: {
        type: [{
            blockNumber: {
                type: String,
                required: [true, 'Block number is required']
            },
            timeStamp: {
                type: String,
            },
            hash: {
                type: String
            },
            nonce: {
                type: String
            },
            blockHash: {
                type: String
            },
            transactionIndex: {
                type: String
            },
            from: {
                type: String
            },
            to: {
                type: String
            },
            value: {
                type: String
            },
            gas: {
                type: String
            },
            gasPrice: {
                type: String
            },
            isError: {
                type: String
            },
            txreceipt_status: {
                type: String
            },
            input: {
                type: String
            },
            contractAddress: {
                type: String
            },
            cumulativeGasUsed: {
                type: String
            },
            gasUsed: {
                type: String
            },
            confirmations: {
                type: String
            },
            methodId: {
                type: String
            },
            functionName: {
                type: String
            },
            ethPrice: {
                type: String
            }
        }]
    },
    balance: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Account", AccountSchema);