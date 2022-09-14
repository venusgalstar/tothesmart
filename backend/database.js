import {config} from './config/config.js';
import mysql from 'sync-mysql';

var startNumber = config.START_BLOCKNUM;
var DB;

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
        setTimeout(initDB, 1000);
    }
    
    console.log("Succeed in establishing connection to database.\n");
}

export{ initDB };

const getLastBlockNumber = () =>
{
    var blockNumber;

    console.log("Trying to get blocknumber from database... \n");

    try{
        var query = "SELECT startBlock FROM config";
        var result = DB.query(query);

        blockNumber = result[0]["startBlock"];
        startNumber = blockNumber;
        
        console.log(startNumber);
    } catch(e)
    {
        console.log("Failed in getting blocknumber from database.\n", e);
    }
    return startNumber;    
}

export{ getLastBlockNumber };

const updateLastBlockNumber = (blockNumber) =>
{
    console.log("Trying to update blocknumber from database... \n");

    try{
        var query = "UPDATE config SET startBlock = "+ blockNumber;
        var result = DB.query(query);
    } catch(e)
    {
        console.log("Failed in update blockNumber to database.\n", e);
    } 
}

export{ updateLastBlockNumber };

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

const insertTransaction = async(transactionList) =>
{
    var idx;
    var query;
    var result;

    console.log("Trying to insert transaction list to database... \n");

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
        console.log("Error occurred in inserting transaction list...\n", e);
        return false;
    }
    return true;
}

export{ insertTransaction };

const getTransactionInfo = (currentBlockNumber) =>
{
    var transactionInfo = {};

    try{
        var startTimestamp = currentBlockNumber - 24 * 3600 * 7;
        var query = "SELECT count(id) as count FROM analystic_list";
        var result = DB.query(query);

        transactionInfo["total_transaction"] = result[0].count;

        query = "SELECT count(id) as count FROM analystic_list WHERE timestamp >= " + startTimestamp;
        result = DB.query(query);

        transactionInfo["new_transaction"] = result[0].count;

        query = "SELECT sum(busd_amount) as sum FROM analystic_list ";
        result = DB.query(query);

        transactionInfo["total_busd"] = Math.round(result[0].sum);

        query = "SELECT sum(busd_amount) as sum FROM analystic_list WHERE timestamp >= " + startTimestamp;
        result = DB.query(query);

        transactionInfo["new_busd"] = Math.round(result[0].sum);

        console.log(transactionInfo);
    } catch(e){
        console.log("Error occurred in inserting erc20_list...\n", e);
        return transactionInfo;
    }
    return transactionInfo;
}

export{ getTransactionInfo };