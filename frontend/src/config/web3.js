import Web3 from 'web3';
import config from './index';

const globalWeb3 = new Web3(config.mainNetUrl);
const gContract = new globalWeb3.eth.Contract(config.ABI, config.CONTRACT_ADDRESS);
const gTokenContract = new globalWeb3.eth.Contract(config.tokenAbi, config.tokenAddr);
const gPoolContract = new globalWeb3.eth.Contract(config.POOLABI, config.POOL);

const provider = Web3.providers.HttpProvider(config.testNetUrl);
const web3 = new Web3(Web3.givenProvider || provider);

const contract = new globalWeb3.eth.Contract(config.ABI, config.CONTRACT_ADDRESS);
const tokenContract = new globalWeb3.eth.Contract(config.tokenAbi, config.tokenAddr);
const poolContract = new globalWeb3.eth.Contract(config.POOLABI, config.POOL);

export {globalWeb3, gContract, gTokenContract, gPoolContract, provider, web3, tokenContract, contract, poolContract}