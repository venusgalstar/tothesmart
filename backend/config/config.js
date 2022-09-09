
import abiNFT from './NFTContract.json' assert {type: 'json'};

var config = {
    "HOST"      : "127.0.0.1",
    "USER"      : "root",
    "PASSWORD"  : "",
    "DATABASE"  : "walletdb",
    "PORT"      : 9000,
    "OPKEY"     : "644f579152f99037f56150bcac0420b69936dbf5b29b3267cbe9ce21601c3060",
    "NET_ID"    : "4",
    "NET_RPC"   : "https://rinkeby.infura.io/v3/57b59f4ada61437eb6c386afae37ec80",

    "NFT_ABI"   : abiNFT,
    "NFT_ADDR"  : "0x25696251e8409992824A9B7Bad6d92790867e909"

}

export {config};
