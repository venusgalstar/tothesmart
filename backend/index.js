// var {config} = require('./config/config.js');
import {config} from './config/config.js';
import * as web3 from './web3.js';
import * as database from './database.js';


import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const router = express.Router();

// init database
database.initDB();

web3.monitorContract();

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
// app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.get('/getWalletCount', async function (req, res){

    console.log(req.query);

    var resultA = database.getWalletCount(req.query.blockNumber);

    res.json(JSON.stringify(resultA));
});

app.get('/getTransactionInfo', async function (req, res){

    console.log(req.query);

    var resultA = database.getTransactionInfo(req.query.blockNumber);

    res.json(JSON.stringify(resultA));
});

app.listen(config.PORT);