const Web3 = require('web3')

const {abi,ast} = require('./fileTransfer.json')

const web3 = new Web3('ws://localhost:7545')

web3.eth.defaultAccount = web3.eth.accounts[0];

//TESTM5D8
//0xb93ccD1BDC0e0751a04f08Ad8512c6Ceb4ba17c2 合约地址
//0xaC60B4Cc5e131540E2911B82F3aec059AaA82A0a 账户地址

//MyBlockChain M5D8
//0xB1943c3dC6418b5Fec8F3Bd3CA97326E214b76b3
const fileContract = new web3.eth.Contract(abi,'0xB1943c3dC6418b5Fec8F3Bd3CA97326E214b76b3',{
    gasPrice: '20000000000',
})

//console.log(fileContract)

module.exports = fileContract