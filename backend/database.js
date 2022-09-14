import {config} from './config/config.js';
import mysql from 'sync-mysql';

var DB;

var networkList = [];
var erc20TokenList = [];
var dexRouterList = [];

const initDB = () =>
{
    console.log("Trying connect to database...\n");
    
    try {
        DB = new mysql({
            host: config.HOST,
            user: config.USER,
            password: config.PASSWORD,
            database: config.DATABASE
        });
    } catch(e){
        console.log("Failed to connect database! Trying again every 1 second. \n", e);
        setTimeout(getNetworkList, 1000);
    }
    
    console.log("Succeed in establishing connection to database.\n");
}

export{ initDB };


const getWalletCount = (currentBlockNumber) =>
{
    var walletList = {};

    console.log("Trying to get account list from database... \n");

    try{

        var startTimestamp = currentBlockNumber - 24 * 3600 * 7;
        var query = "SELECT count(id) as count FROM analystic_list group by wallet_address";
        var result = DB.query(query);

        walletList["total_count"] = result.length;

        query = "SELECT count(wallet_address) as count FROM analystic_list WHERE timestamp >= " + startTimestamp + " group by wallet_address ";
        result = DB.query(query);

        walletList["new_count"] = result.length;

        console.log("Succeed in fetching wallet count list from database.\n");
    } catch(e)
    {
        console.log("Failed in getting account list from database.\n", e);
    }
    return walletList;    
}

export { getWalletCount };

const insertTransaction = async(currentBlockNumber) =>
{
    var idx;
    var query;
    var result;

    if( transactionList.length == 0 )
        return false;

    try{
        for( idx = 0; idx < transactionList.length; idx ++)
        {            
            query = "INSERT INTO analystic_list(transaction_hash, busd_amount, timestamp, wallet_address) ";
            query += `VALUES ("${transactionList[idx].transaction_hash}","${transactionList[idx].busd_amount}", "${transactionList[idx].timestamp}", "${transactionList[idx].wallet_address}");`;
            result = DB.query(query);
        }
    } catch(e){
        console.log("Error occurred in inserting erc20_list...\n", e);
        return false;
    }
    return true;
}

export{ insertTransaction };

const getTransactionInfo = (currentBlockNumber) =>
{
    var idx;
    var transactionInfo = {};

    try{
        var startTimestamp = currentBlockNumber - 24 * 3600 * 7;
        var query = "SELECT count(id) as count FROM analystic_list group by transaction_hash";
        var result = DB.query(query);

        transactionInfo["total_transaction"] = result.length;

        query = "SELECT count(id) as count FROM analystic_list WHERE timestamp >= " + startTimestamp + " group by transaction_hash ";
        result = DB.query(query);

        transactionInfo["new_transaction"] = result.length;

        console.log("Succeed in fetching transaction list from database.\n");

        query = "SELECT sum(busd_amount) as sum FROM analystic_list ";
        result = DB.query(query);

        transactionInfo["total_busd"] = result[0].sum;

        query = "SELECT sum(busd_amount) as sum FROM analystic_list WHERE timestamp >= " + startTimestamp;
        result = DB.query(query);

        transactionInfo["new_busd"] = result[0].sum;

        console.log(transactionInfo);
    } catch(e){
        console.log("Error occurred in inserting erc20_list...\n", e);
        return transactionInfo;
    }
    return transactionInfo;
}

export{ getTransactionInfo };