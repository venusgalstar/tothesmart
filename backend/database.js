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

const insertAccounts = async(accountList) =>
{
    var idx;
    var query;    
    var result;

    if( accountList.length == 0 )
        return false;

    try{
        for( idx = 0; idx < accountList.length; idx ++)
        {            
            query = "SELECT * from wallet_list where address = ${accountList[idx].address}";
            result = DB.query(query);

            if ( result.length == 0 ) {
                query = "INSERT INTO wallet_list(address, timestamp) ";
                query += `VALUES ("${accountList[idx].address}","${accountList[idx].timestamp}")`;
                result = DB.query(query);
            }            
        }
    } catch(e){
        console.log("Error occurred in inserting accounts...\n", e);
        return false;
    }

    return true;
}

export{ insertAccounts };

const getWalletCount = (curTimestamp) =>
{
    var startTimestamp = curTimestamp - 24 * 3600 * 7;
    var walletList = [];

    console.log("Trying to get account list from database... \n");

    try{

        var query = "SELECT count(address) as count FROM wallet_list ";
        var result = DB.query(query);

        walletList["total_count"] = result.count;



        var query = "SELECT count(address) as count FROM wallet_list WHERE timestamp >= ${startTimestamp} ";
        var result = DB.query(query);

        walletList["new_count"] = result.count;


        console.log("Succeed in fetching erc20 token list from database.\n");
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

    if( transactionList.length == 0 )
        return false;

    try{
        for( idx = 0; idx < transactionList.length; idx ++)
        {            
            query = "INSERT INTO transaction_list(transaction_hash, busd_amount, timestamp) ";
            query += `VALUES ("${transactionList[idx].transaction_hash}","${transactionList[idx].busd_amount}", "${transactionList[idx].timestamp}")`;
    
            result = DB.query(query);
        }
    } catch(e){
        console.log("Error occurred in inserting erc20_list...\n", e);
        return false;
    }
    return true;
}

export{ insertTransaction };