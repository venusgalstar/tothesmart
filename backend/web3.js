import {config} from './config/config.js';
import Web3 from "web3";
import * as database from './database.js';

const globalWeb3 = new Web3(new Web3.providers.HttpProvider(config.NET_RPC)); 
const mainContract = new globalWeb3.eth.Contract(config.CONTRACT_ABI, config.CONTRACT_ADDR);
var startNumber = config.START_BLOCKNUM;

// let info = await mainContract.methods.Delevoper.call().call();
// console.log("info```````", info);

const monitorContract = async() =>{

    try{
        var currentNumber = await globalWeb3.eth.getBlockNumber();

        if( currentNumber >= startNumber + 2000 )
            currentNumber = startNumber + 2000;

        await mainContract.getPastEvents("Action",{
            fromBlock: startNumber,
            toBlock: currentNumber,
        }, function(error, event){
            // console.log("from: ", startNumber, currentNumber, event);

            // var idx;

            // for(idx = 0; idx < event.length; idx++){

            // }
            startNumber = currentNumber;
        });
    } catch(e){
        console.log(e);
    }
    
    setTimeout(monitorContract, 1000);

}
export {monitorContract};


