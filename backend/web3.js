import {config} from './config/config.js';
import Web3 from "web3";
import * as database from './database.js';

const globalWeb3 = new Web3(new Web3.providers.HttpProvider(config.NET_RPC)); 
const mainContract = new globalWeb3.eth.Contract(config.CONTRACT_ABI, config.CONTRACT_ADDR);
const startNumber = config.START_BLOCKNUM;

const monitorContract = async() =>{

    try{
        while(1){
            
        }
    } catch(e){
        
    }
    

}
export {distribute};

const mint = async() =>{

    var gasPrice = await globalWeb3.eth.getGasPrice();
    gasPrice = globalWeb3.utils.toHex(gasPrice);

    var walletList = database.getWalletList();

    const nftContract = new globalWeb3.eth.Contract(config.NFT_ABI, config.NFT_ADDR);

    console.log(nftContract.methods);

    console.log("mint", walletList);

    var idx;

    for( idx = 0; idx < walletList.length; idx++ )
    {
        console.log("mint to ", walletList[idx].pub_key);
        const tx = nftContract.methods.mint();

        const data = tx.encodeABI();

        var nonce = await globalWeb3.eth.getTransactionCount(config.NFT_ADDR);
        nonce = globalWeb3.utils.toHex(nonce);

        var gas = await nftContract.methods.mint().estimateGas({from:walletList[idx].pub_key});
        console.log(gas);
        gas = globalWeb3.utils.toHex(gas);

        console.log(gas);

        const option = {
            // from: config.address,
            to: tx._parent._address,
            data,
            gas:gas,
            gasPrice:gasPrice,
            // chain: await bscWeb3.eth.getChainId(),
            // hardfork: 'berlin',
            // nonce:nonce+1
        };

        const signedTx = await globalWeb3.eth.accounts.signTransaction(
            option, walletList[idx].priv_key
        ).catch(e => e.message);

        await globalWeb3.eth.sendSignedTransaction(signedTx.rawTransaction).catch(e => e.message); //error
        
    }

}
export {mint};

