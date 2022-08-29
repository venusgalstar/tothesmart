import { createStore } from 'redux';
import config from '../config/index';
import { globalWeb3, gContract, gTokenContract, gPoolContract, web3, tokenContract, contract, poolContract } from '../config/web3';

var walletConnected = false;
var currentAddr;

const _initialState = {
    account: "Connect Wallet",
}

const init = (init) => {
    return init;
}

const reducer = (state = init(_initialState), action) => {

    if (action.type === 'GET_USER_INFO') {
        console.log("account", action.payload.account);
        return Object.assign({}, state, {
            account: action.payload.account,
        })
    } else if( action.type === 'CONNECT_WALLET'){
        Wallet();
    }
    return state;
}

const swichNetwork = async (chainId) => {
    const currentChainId = await web3.eth.net.getId();

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

const store = createStore(reducer);
export default store