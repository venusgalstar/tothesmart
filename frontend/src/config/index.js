
var ABI = require('./contractAbi.json');
var tokenAbi = require('./tokenAbi.json');
var POOLABI = require('./poolAbi.json');


var config = {
    main: {
        NETWORK_ID: 56,
        mainNetUrl: "https://bsc-dataseed1.binance.org",
        CONTRACT_ADDRESS : "0x2F9315577D7f45025a50ca744F474069EbB2b1F3",
        tokenAddr : "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        POOL : "0x0cfF03D61af4eF29a374B8aeEF8bbEdD6Abc63B5",
        ABI : ABI,
        tokenAbi : tokenAbi,
        POOLABI : POOLABI
    },

    test: {
    }
}


export default config.main;