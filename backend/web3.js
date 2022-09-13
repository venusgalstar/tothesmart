import {config} from './config/config.js';
import Web3 from "web3";
import * as database from './database.js';

const globalWeb3 = new Web3(new Web3.providers.HttpProvider(config.NET_RPC)); 
const mainContract = new globalWeb3.eth.Contract(config.CONTRACT_ABI, config.CONTRACT_ADDR);
const startNumber = config.START_BLOCKNUM;

const monitorContract = async() =>{

    try{
        mainContract.events.allEvents({
            fromBlock: config.START_BLOCKNUM
        }, function(error, event){
            console.log(event);
        });
    } catch(e){
        
    }
    

}
export {monitorContract};


