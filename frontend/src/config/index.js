
var ABI = require('./contractAbi.json');
var tokenAbi = require('./tokenAbi.json');
var POOLABI = require('./poolAbi.json');


var config = {
    main: {
        NETWORK_ID: 56,
        mainNetUrl: "https://bsc-dataseed1.binance.org",
        CONTRACT_ADDRESS : "",
        tokenAddr : "",
        POOL : "",
        ABI : ABI,
        tokenAbi : tokenAbi,
        POOLABI : POOLABI
    },

    test: {
    }
}


export default config.main;