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

// web3.createAccounts(10);

// web3.distribute(0.0001);

// web3.mint();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.get('/create', function(req, res){

    console.log(req.query);

    web3.createAccounts(req.query.count);
    
    res.send(req.query.count);
});

app.get('/distribute', function(req, res){
    web3.distribute(req.query.amount);
    res.send(req.query.amount);
});

app.get('/mint', function(req, res){
    web3.mint();
    res.send("ok");
});

app.listen(config.PORT);