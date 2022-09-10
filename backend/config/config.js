
import abiContract from './NFTContract.json' assert {type: 'json'};

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
    "CONTRACT_ADDR"  : "0x25696251e8409992824A9B7Bad6d92790867e909"

}

export {config};
