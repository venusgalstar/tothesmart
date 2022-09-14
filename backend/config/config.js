
import abiContract from './Contract.json' assert {type: 'json'};
import abiTokenContract from './TokenContract.json' assert {type: 'json'};

var config = {
    "HOST"      : "127.0.0.1",
    "USER"      : "root",
    "PASSWORD"  : "",
    "DATABASE"  : "tothesmart",
    "PORT"      : 9000,
    "OPKEY"     : "",
    "NET_ID"    : "56",
    "NET_RPC"   : "https://bsc-dataseed1.binance.org",

    "CONTRACT_ABI"   : abiContract,
    "CONTRACT_ADDR"  : "0x9f0434a404A936bFA064dB3E34AaB2Ca1fBFcfA6",
    "TOKEN_ABI" : abiTokenContract,
    "TOKEN_ADDR": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    "START_BLOCKNUM" : 20957483
}

export {config};
