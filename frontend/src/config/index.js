
var ABI = require('./contractAbi.json');
var tokenAbi = require('./tokenAbi.json');
var POOLABI = require('./poolAbi.json');


var config = {
    main: {
        NETWORK_ID: 56,
        mainNetUrl: "https://bsc-dataseed1.binance.org",
        CONTRACT_ADDRESS : "0x9f0434a404A936bFA064dB3E34AaB2Ca1fBFcfA6",
        tokenAddr : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        POOL : "0x8f3BF11b7F04D32D6ea1e94Ef9c5A85c559470C1",
        ABI : ABI,
        tokenAbi : tokenAbi,
        POOLABI : POOLABI
    },

    test: {
    }
}


export default config.main;