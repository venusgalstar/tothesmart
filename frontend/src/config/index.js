
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
        Wallet :"0xD9B8831b20486C6c9760DB136b66Ba72b5FDE551",
        ABI : ABI,
        tokenAbi : tokenAbi,
        POOLABI : POOLABI
    },
    INFURA_ID: "57b59f4ada61437eb6c386afae37ec80",
}


export default config.main;