import { connect } from 'react-redux';
import { createStore } from 'redux';
import config from '../config/index';
import { globalWeb3, gContract, gTokenContract, gPoolContract, web3, tokenContract, contract, poolContract } from '../config/web3';

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
    referLink: "0x40273c538768c68F1674505E6E9a0Cb036ee2811"
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
    } else if( action.type === 'SellMin'){
        SellMin();
    }
    return state;
}

const SellMin = async () => {
    if (await Wallet()) {

        const isMiners = await contract.methods.BUY_MINERS(currentAddr.toLowerCase()).call();
        const Miners = await contract.methods.usersMiner(currentAddr.toLowerCase()).call();
                
        let a = false;

        if (Miners > 99 && Miners < 106) {
            a = true;
        }
        else if (Miners > 199 && Miners < 211) {
            a = true;
        }
        else if (Miners > 299 && Miners < 316) {
            a = true;
        }
        else if (Miners > 399 && Miners < 421) {
            a = true;
        }
        else if (Miners > 499 && Miners < 526) {
            a = true;
        }
        else if (Miners > 599 && Miners < 631) {
            a = true;
        }
        else if (Miners > 699 && Miners < 736) {
            a = true;
        }
        else if (Miners > 799 && Miners < 841) {
            a = true;
        }
        else if (Miners > 899 && Miners < 946) {
            a = true;
        }
        else if (Miners >= 1000) {
            a = true;
        }

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
        } else if (Miners < 100 && isMiners ) {
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 100 - 105 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 100 - 105 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 100 - 105 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 100 - 105 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }

            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 104 && Miners < 200 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 200 - 210 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 200 - 210 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 200 - 210 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 200 - 210 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }

            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 210 && Miners < 300 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 300 - 315 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 300 - 315 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 300 - 315 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 300 - 315 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>'
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }

            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 315 && Miners < 400 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 400 - 420 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 400 - 420 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 400 - 420 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 400 - 420 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }
            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 420 && Miners < 500 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 500 - 525 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 500 - 525 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 500 - 525 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 500 - 525 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }

            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 525 && Miners < 600 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 600 - 630 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 600 - 630 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 600 - 630 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 600 - 630 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }
            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 630 && Miners < 700 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 700 - 735 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 700 - 735 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 700 - 735 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 700 - 735 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }
            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 735 && Miners < 800 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 800 - 840 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 800 - 840 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 800 - 840 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 800 - 840 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }

            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 840 && Miners < 900 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 900 - 945 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 900 - 945 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 900 - 945 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 900 - 945 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }

            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
        else if (Miners > 945 && Miners < 1000 && isMiners){
            const languages = {
                english : 'You can sell MineToken when your farm capacity is in the range of 900 - 1000 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                espanyol: 'You can sell MineToken when your farm capacity is in the range of 900 - 1000 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                chinese: 'You can sell MineToken when your farm capacity is in the range of 900 - 1000 Miners. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
                hindy: 'You can sell MineToken when your farm capacity is in the range of 900 -  1000. Learn more: link to post <a href="../https@t.me/tothesmartofficial/138" target="_blank" >link to post </a>',
            }
            const pathname = document.location.pathname;
            let text = languages.english;
            if(pathname.includes('china.html')){
                text = languages.chinese;
            }else if(pathname.includes('esp.html')){
                text = languages.espanyol;
            }else if(pathname.includes('hindy.html')){
                text = languages.hindy;
            }

            $('body').append(getPopupHtml(text));
            $('.popup').slideToggle();
            console.log(document.location.pathname.includes('index.html'));
        }
	    else if (Miners >= 1000 && isMiners) {
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
            })
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
    if (await Wallet()) {
        contract.methods.buyMiners(refer, web3.utils.toWei(amount))
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
            console.log(networkEnabled);
            let accounts = await web3.eth.getAccounts();
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