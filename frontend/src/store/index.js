import { connect } from 'react-redux';
import { createStore } from 'redux';
import Web3 from 'web3';
import config from '../config/index';
import { web3Modal, globalWeb3, gContract, gTokenContract, gPoolContract} from '../config/web3';

let web3;
let tokenContract;
let contract;
let poolContract;

var walletConnected = false;
var currentAddr;
var gasPrice = '10000000000'; //10000000000

const _initialState = {
    account: "Connect Wallet",
    miner: "000",
    tokens: "00.000",
    reward: "00.0000 BUSD",
    poolBalance: "000.0000 BUSD",
    contractBalance: "000.0000 BUSD",
    lastUser: "",
    moment: "",
    timePoolPassed: "00:00",
    timeContractPassed: "00 : 00 : 00 : 00",
    stakeAmount: 50,
    referLink: "",
    walletConnectStatus: false,
}

const init = (init) => {
    return init;
}

const reducer = (state = init(_initialState), action) => {

    if (action.type === 'GET_USER_INFO') {
        console.log("GET_USER_INFO, account", action.payload.account);
        return Object.assign({}, state, {
            account: action.payload.account,
            referLink: action.payload.account,
            walletConnectStatus: true,
        });
    } else if( action.type === 'CONNECT_WALLET'){
        Wallet();
    } else if( action.type === 'CONTRACT_INFO'){
        Connect();
    } else if( action.type === 'GET_MINER'){
        return Object.assign({}, state, {
            miner: action.payload.miner,
        });
    } else if( action.type === 'GET_TOKENS'){
        return Object.assign({}, state, {
            tokens: action.payload.tokens,
        });
    } else if( action.type === 'GET_REWARD'){
        return Object.assign({}, state, {
            reward: action.payload.reward,
        });
    } else if( action.type === 'POOL_BALANCE'){
        return Object.assign({}, state, {
            poolBalance: action.payload.poolBalance,
        });
    } else if( action.type === 'CONTRACT_BALANCE'){
        return Object.assign({}, state, {
            contractBalance: action.payload.contractBalance,
        });
    } else if( action.type === 'LAST_USER'){
        return Object.assign({}, state, {
            lastUser: action.payload.lastUser,
        });        
    } else if( action.type === 'UPDATE_TIME'){
        return Object.assign({}, state, {
            moment: action.payload.moment,
        });    
    } else if( action.type === 'UPDATE_TIMEPOOL_TIME'){
        return Object.assign({}, state, {
            timePoolPassed: action.payload.timePoolPassed,
        });
    } else if( action.type === 'UPDATE_CONTRACT_TIME'){
        return Object.assign({}, state, {
            timeContractPassed: action.payload.timeContractPassed,
        });
    } else if( action.type === 'GET_FREE_MINER'){
        GetFreeMin();
    } else if( action.type === 'SET_MAX_STAKEAMOUNT'){
        SetMaxStakeAmount();
    } else if( action.type === 'SET_STAKEAMOUNT'){
        return Object.assign({}, state, {
            stakeAmount: action.payload.stakeAmount,
        });
    } else if( action.type === 'APPROVE_BUSD'){
        approveBUSD(state.account);
    } else if( action.type === 'BUY_MINER'){
        BuyMin(state.referLink, state.stakeAmount);
    } else if( action.type === 'REINVEST'){
        reinvest();
    } else if( action.type === 'SELL_MINER'){
        SellMin();
    } else if( action.type === 'UPDATE_REFERLINK'){

        if( state.walletConnectStatus ){
            const refAddr = web3.utils.isAddress(action.payload.referLink)?action.payload.referLink:config.Wallet;

            return Object.assign({}, state, {
                referLink: refAddr,
            });
        }
        
    } else if( action.type === 'GET_CONTRACT_INFO'){
        getContractInfo();
    }
    return state;
}

const getContractInfo = async () => {
    
    gTokenContract.methods.balanceOf(config.CONTRACT_ADDRESS).call().then(res => {
        store.dispatch({
            type: "CONTRACT_BALANCE",
            payload: { contractBalance: ` ${(res / 1e18).toFixed(0)} BUSD` }
        });
    })

    gPoolContract.methods.moment().call().then(res => {
        console.log("moment", res);
        store.dispatch({
            type: "UPDATE_TIME",
            payload: { moment: res}
        });
    })

    gTokenContract.methods.balanceOf(config.POOL).call().then(res => {
        console.log("POOL", config.POOL, res);
        store.dispatch({
            type: "POOL_BALANCE",
            payload: { poolBalance: ` ${(res / 1e18).toFixed(6)} BUSD` }
        });
    })

    gPoolContract.methods.lastUser().call().then(res => {
        store.dispatch({
            type: "LAST_USER",
            payload: { lastUser: res }
        });
    })
}
const SellMin = async () => {
    if (await Wallet()) {

        const isMiners = await contract.methods.BUY_MINERS(currentAddr.toLowerCase()).call();
        const Miners = await contract.methods.usersMiner(currentAddr.toLowerCase()).call();
                
        let a = false;
        var idx = 1, level;

        for( idx = 1; idx < 10; idx++ )
        {
            if( Miners < 100 * idx ){
                level = idx;
                break;
            }

            if( Miners <= idx * 100 + idx * 5  ){
                a = true;
                break;
            }   
        }

        if( idx == 10 )
            a = true;

        if (isMiners == false) {
            document.querySelector('.error-info').style.display = 'block'

            setTimeout(() => {
                document.querySelector('.error-info').style.display = 'none'
            }, 5000);           
        }  
        else if (isMiners && a) {
            contract.methods.getMyTokens(currentAddr).call().then(res => {
                if (res > 0) {
                    contract.methods.calculateTokensSell(res).call().then(res2 => {
                        contract.methods.sellTokens(res2)
                            .send({
                                from: currentAddr,
                                gasPrice: gasPrice,
                            })
                    })
                }
            });
        } else if ( isMiners ) {
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of ${100*level - 101 * level} Miners. Learn more: link to post <a href="" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 100 - 105 Miners. Learn more: link to post <a href="" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 100 - 105 Miners. Learn more: link to post <a href="" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 100 - 105 Miners. Learn more: link to post <a href="" target="_blank" >link to post </a>',
            }
            
            let text = languages.english;
            alert(text);
        }
    }
}
const reinvest = async () => {

    if (await Wallet()) {

        const isMiners1 = await contract.methods.BUY_MINERS(currentAddr).call()
        if (isMiners1) {
            contract.methods.reinvest()
            .send({
                from: currentAddr,
                gasPrice: gasPrice,
            })
        }
         else {
            document.querySelector('.error-info').style.display = 'block'

            setTimeout(() => {
                document.querySelector('.error-info').style.display = 'none'

            }, 5000)
         }
    }
}

const BuyMin = async (refer, amount) => {
    console.log(amount);
    if (await Wallet()) {
        const ref = web3.utils.isAddress(refer)
			? refer
			: config.Wallet;

        contract.methods.buyMiners(ref, web3.utils.toWei(amount.toString(), 'ether'))
            .send({ from: currentAddr, gasPrice: gasPrice, });
    }
}

const approveBUSD = async (account) => {
    if( await Wallet() ){
        tokenContract.methods.approve(config.CONTRACT_ADDRESS, web3.utils.toWei((2**64-1).toString(),'ether'))
        .send({ from: account })
        .then(()=>{console.log("OK")});
    }
}


const SetMaxStakeAmount = async () => {
    if (await Wallet() && tokenContract) {
        tokenContract.methods.balanceOf(currentAddr).call().then(res => {
            console.log("stakeAmount", res);
            store.dispatch({
                type: "SET_STAKEAMOUNT",
                payload:{stakeAmount: res / 1e18}
            });
        })
    }
}

const GetFreeMin = async () => {
    await Wallet();
    if (contract) {
        const isGetFreeEgs = await contract.methods.OneGetFree(currentAddr).call();

        console.log("isGetFreeEgs", isGetFreeEgs);

        if (isGetFreeEgs) {
            document.querySelector('.error-egs').style.display = 'block'

            setTimeout(() => {
                document.querySelector('.error-egs').style.display = 'none'

            }, 5000)
        } else {   
            contract.methods.getFreeMiners_10BUSD()
            .send({
                from: currentAddr,
                gasPrice: gasPrice,
            })
        }
    }
}

const swichNetwork = async (web3ModalProvider) => {
    try {
        await web3ModalProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            alert(`You should first add BSC (id: ${config.NETWORK_ID}) in your wallet networks`);
        }
        return false;
    }
    return true;
}


async function addListeners(web3ModalProvider) {

    web3ModalProvider.on("accountsChanged", (accounts) => {
        walletConnected = true;
        currentAddr = accounts[0];

        store.dispatch({
            type: "GET_USER_INFO",
            payload: { account: accounts[0] }
        });
    });
    
    // Subscribe to chainId change
    // web3ModalProvider.on("chainChanged", (chainId) => {
    //   window.location.reload()
    // });
  }

const Wallet = async () => {

    console.log("walletConnected", walletConnected);

    if (!walletConnected) {

        await web3Modal.clearCachedProvider();
        const provider = await web3Modal.connect();

        web3 = new Web3(provider);
        
        // Check chain ID and swich if possible
        let networkEnabled = await swichNetwork(provider);

        // if( 1 ) {
        if (networkEnabled) {
            
            await window.ethereum.send("eth_requestAccounts");
            const accounts = await web3.eth.getAccounts();
            const currentAddr = accounts[0];


            contract = new web3.eth.Contract(config.ABI, config.CONTRACT_ADDRESS);
            tokenContract = new web3.eth.Contract(config.tokenAbi, config.tokenAddr);
            poolContract = new web3.eth.Contract(config.POOLABI, config.POOL);
            
            store.dispatch({
                type: "GET_USER_INFO",
                payload: { account: currentAddr }
            });

            addListeners(provider);
            walletConnected = true;
        }
    }

    return walletConnected;
}

const Connect = () => {

    setInterval(async () => {

        console.log("walletConnected", walletConnected);

        if( !walletConnected )
            return;

        if (contract) {

            if (currentAddr) {
                contract.methods.getMyMiners(currentAddr).call().then(res => {
                    store.dispatch({
                        type: "GET_MINER",
                        payload: { miner: res }
                    });
                    console.log('My miners: ', res);
                })

                contract.methods.getMyTokens(currentAddr).call().then(res => {
                    store.dispatch({
                        type: "GET_TOKENS",
                        payload: { tokens: res }
                    });
                    if (res > 0) {
                        console.log("Tokens: ", res);
                        contract.methods.calculateTokensSell(res).call().then(res2 => {
                            store.dispatch({
                                type: "GET_REWARD",
                                payload: { reward: ` ${(res2 / 1e18).toFixed(6)} BUSD` }
                            });
                            console.log(res2);
                        })
                    }
                })
            }
        }
    }, 7000);
}

const store = createStore(reducer);
export default store