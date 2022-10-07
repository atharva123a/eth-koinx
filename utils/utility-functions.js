const CoinGecko = require('coingecko-api');
const Convert = require('../models/Convert');

const CoinGeckoClient = new CoinGecko();

const convertEth = async () => {

    let { data } = await CoinGeckoClient.simple.price({
        ids: ['ethereum'],
        vs_currencies: ['inr'],
    })

    let from = Object.keys(data)[0];

    let to = Object.keys(data[from])[0];

    let convert = data[from][to];

    let converted = await Convert.findOne({ from, to });
    if (!converted) {
        converted = await Convert.create({ from, to, convert });
        return;
    }

    converted.convert = convert;
}

module.exports = { convertEth };