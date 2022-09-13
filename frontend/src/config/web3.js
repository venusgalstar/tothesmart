import Web3 from 'web3';
import config from './index';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: config.INFURA_ID, // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "web3modal", // Required
      infuraId: config.INFURA_ID, // Required
      rpc: "https://bsc-dataseed1.binance.org", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 97, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  binancechainwallet: {
    package: true,
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});


const globalWeb3 = new Web3(config.mainNetUrl);
const gContract = new globalWeb3.eth.Contract(config.ABI, config.CONTRACT_ADDRESS);
const gTokenContract = new globalWeb3.eth.Contract(config.tokenAbi, config.tokenAddr);
const gPoolContract = new globalWeb3.eth.Contract(config.POOLABI, config.POOL);

// const provider = Web3.providers.HttpProvider(config.mainNetUrl);
// const web3 = new Web3(Web3.givenProvider || provider);

// const contract = new web3.eth.Contract(config.ABI, config.CONTRACT_ADDRESS);
// const tokenContract = new web3.eth.Contract(config.tokenAbi, config.tokenAddr);
// const poolContract = new web3.eth.Contract(config.POOLABI, config.POOL);

export {web3Modal, globalWeb3, gContract, gTokenContract, gPoolContract}