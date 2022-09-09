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
    
    query = "TRUNCATE accounts";
    result = DB.query(query);

    try{
        for( idx = 0; idx < accountList.length; idx ++)
        {            

            query = "INSERT INTO accounts(pub_key, priv_key) ";
            query += `VALUES ("${accountList[idx].pub_key}","${accountList[idx].priv_key}")`;
    
            result = DB.query(query);
        }
    } catch(e){
        console.log("Error occurred in inserting accounts...\n", e);
        return false;
    }

    return true;
}

export{ insertAccounts };

const getWalletList = () =>
{
    var idx, idx1;

    var walletList = [];

    console.log("Trying to get account list from database... \n");

    try{

        var query = "SELECT * FROM accounts ";
        var result = DB.query(query);

        for( idx = 0; idx < result.length; idx++)
        {
            walletList[idx] = {
                pub_key : "0x" + result[idx].pub_key, 
                priv_key: "0x" + result[idx].priv_key
            };

        }

        console.log("Succeed in fetching erc20 token list from database.\n");
    } catch(e)
    {
        console.log("Failed in getting account list from database.\n", e);
    }
    
    return walletList;    
}

export { getWalletList };

const getERC20TokenList = () =>
{
    var idx, idx1;

    erc20TokenList = [];

    console.log("Trying to get erc20 token list from database... \n");

    try{

        for(idx = 0; idx < networkList.length; idx++)
        {
            var query = "SELECT * FROM erc20_list WHERE network_id = " + networkList[idx].id;
            var result = DB.query(query);

            erc20TokenList[networkList[idx].id] = result;
            erc20TokenList[networkList[idx].id]["token_address"] = [];

            for( idx1 = 0; idx1 < result.length; idx1++ )
            {
                erc20TokenList[networkList[idx].id]["token_address"][idx1] = result[idx1]["token_address"];
            }        
        }
    } catch(e)
    {
        console.log("Failed in fetching erc20 token list from database. Trying again every second\n", e);
        setTimeout(getERC20TokenList, 1000);
    }

    console.log("Succeed in fetching erc20 token list from database. \n");
    
    return erc20TokenList;    
}

const getDexRouterList = () =>
{
    var idx, idx1;
    
    dexRouterList = [];

    for(idx = 0; idx < networkList.length; idx++)
    {
        var query = "SELECT * FROM dex_list WHERE network_id = " + networkList[idx].id;
        var result = DB.query(query);

        
        dexRouterList[networkList[idx].id] = result;

        dexRouterList[networkList[idx].id]["router_address"] = [];

        for( idx1 = 0; idx1 < result.length; idx1++ )
        {
            dexRouterList[networkList[idx].id]["router_address"][idx1] = result[idx1]["router_address"];
        }       

    }

    return dexRouterList;    
}

export {initDB, getERC20TokenList, getDexRouterList};

const insertNewERC20Tokens = async(newTokenList) =>
{
    var idx;
    var query;
    var result;

    if( newTokenList.length == 0 )
        return false;

    try{
        for( idx = 0; idx < newTokenList.length; idx ++)
        {
            query = `SELECT * FROM erc20_list WHERE token_address = '${newTokenList[idx].token_address}'`;
            result = DB.query(query);
    
            if( result.length > 0 )
                continue;
            
            query = "INSERT INTO erc20_list(network_id, token_address, token_name, token_symbol, token_decimal, token_logo, token_type) ";
            query += `VALUES ("${newTokenList[idx].network_id}","${newTokenList[idx].token_address}", "${newTokenList[idx].token_name}", "${newTokenList[idx].token_symbol}", "${newTokenList[idx].token_decimal}", "${newTokenList[idx].token_logo}", "${newTokenList[idx].token_type}")`;
    
            result = DB.query(query);
        }
    } catch(e){
        console.log("Error occurred in inserting erc20_list...\n", e);
        return false;
    }
    return true;
}

export{ insertNewERC20Tokens };