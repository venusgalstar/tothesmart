import { connect } from 'react-redux';
import { createStore } from 'redux';
import config from '../config/index';
import { globalWeb3, gContract, gTokenContract, gPoolContract, web3, tokenContract, contract, poolContract } from '../config/web3';

var walletConnected = false;
var currentAddr;

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
    timeContractPassed: "00 : 00 : 00 : 00"
}

const init = (init) => {
    return init;
}

const reducer = (state = init(_initialState), action) => {

    if (action.type === 'GET_USER_INFO') {
        console.log("account", action.payload.account);
        return Object.assign({}, state, {
            account: action.payload.account,
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
    }
    return state;
}

const swichNetwork = async (chainId) => {
    const currentChainId = await web3.eth.net.getId();

    console.log("currentChainId", currentChainId);
    console.log("chainId", chainId);

    if (currentChainId !== chainId) {
        try {
            await web3.currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                alert(`You should first add BSC (id: ${chainId}) in your wallet networks`);
            }
            return false;
        }
    }
    return true;
}

const Wallet = async () => {

    console.log("walletConnected", walletConnected);

    if (!walletConnected) {

        if (window.ethereum) {
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.error(error);
            }
        } 

        // Check chain ID and swich if possible
        let networkEnabled = swichNetwork(config.NETWORK_ID);
        console.log(await networkEnabled);

        if (await networkEnabled) {
            console.log(networkEnabled)
            let accounts = await web3.eth.getAccounts()
            currentAddr = accounts[0];

            store.dispatch({
                type: "GET_USER_INFO",
                payload: { account: currentAddr }
            });

            window.ethereum.on('accountsChanged', function (currentAddr) {
                store.dispatch({
                    type: "GET_USER_INFO",
                    payload: { account: currentAddr }
                });
            })
            
            walletConnected = true;
        }
    }

    return walletConnected;
}

// Get txs list from bscscan api
// const getTransactions = () => {
   
//     let requestUrl = `https://api.bscscan.com/api?module=account&action=txlist&address=${config.CONTRACT_ADDRESS}&startblock=1&endblock=99999999&sort=desc&apikey=VP78XG8PH3S2QQTEDNXUC4IK8XR928P3CR`;

//     $.ajax({
//         url: requestUrl,
//         success: function (data) {
//             let txs = [];
//             data['result'].forEach(element => {
//                 // console.log(typeof element.timeStamp, 'jnhgfrdewstrfg');
//                 let method = abiDecoder.decodeMethod(element.input);

//                 if ((method?.name == 'buyMiners' || method?.name == 'sellTokens') && (element.from == currentAddr?.toLowerCase() || element.to == currentAddr?.toLowerCase())) {
//                     let txData = {
//                         method: method.name,
//                         amount: method.name == 'buyMiners' ? (method.params[1]?.value / 1e18).toFixed(2) : (method.params[0]?.value / 1e18).toFixed(2),
//                         hash: element.hash,
//                         timeAgo: timeSince(element.timeStamp),
//                     };
//                     txs.push(txData);
//                 }
//             });
//             fillTransactions(txs);
//         }
//     });
// }

const Connect = () => {

    setInterval(async () => {

        // getTransactions();

        console.log("walletConnected", walletConnected);

        if( !walletConnected )
            return;

        let requestOption = {
            type: 'GET'
        }

        // fetch('https://tothesmart.com/js/out.json', requestOption).then((res) => res.json()).then((json)=>{
        //     console.log(json);

        // }).catch({

        // });

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

            poolContract.methods.moment().call().then(res => {
                console.log("moment", res);
                store.dispatch({
                    type: "UPDATE_TIME",
                    payload: { moment: res}
                });
            })

            tokenContract.methods.balanceOf(config.POOL).call().then(res => {
                store.dispatch({
                    type: "POOL_BALANCE",
                    payload: { poolBalance: ` ${(res / 1e18).toFixed(6)} BUSD` }
                });
            })

            tokenContract.methods.balanceOf(config.CONTRACT_ADDRESS).call().then(res => {
                store.dispatch({
                    type: "CONTRACT_BALANCE",
                    payload: { contractBalance: ` ${(res / 1e18).toFixed(0)} BUSD` }
                });
            })

            poolContract.methods.lastUser().call().then(res => {
                store.dispatch({
                    type: "LAST_USER",
                    payload: { lastUser: res }
                });
            })

        }
    }, 7000);
}

const store = createStore(reducer);
export default store