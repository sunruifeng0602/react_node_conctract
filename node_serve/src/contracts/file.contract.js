const Web3 = require('web3')

const {CONTRACT} = require('../config/config.default')
const {abi} = require('./fileTransfer.json')

const web3 = new Web3('ws://localhost:8545')

web3.eth.defaultAccount = web3.eth.accounts[0];

//TESTM5D8
//0xb93ccD1BDC0e0751a04f08Ad8512c6Ceb4ba17c2 合约地址
//0xaC60B4Cc5e131540E2911B82F3aec059AaA82A0a 账户地址

//MyBlockChain M5D8
//0xB1943c3dC6418b5Fec8F3Bd3CA97326E214b76b3 合约地址
//0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8 账户地址

//FinalM6D5
//0xC292b27d974c114cB70691e0a7Cd2D0c29aA2304 合约地址
//0x7Cc81a5337cFDafa42D128330d424c0f2D6CfbE5 账户地址

//final
//0x8bC39C50370b1FEF7a6E3737CE2Cc1C02ED4Aa86 合约地址
//0x62F77AE86824bcb4bae27fa01697cCf1d788B61E 账户地址

const fileContract = new web3.eth.Contract(abi,'0x8bC39C50370b1FEF7a6E3737CE2Cc1C02ED4Aa86',{
    gasPrice: '20000000000',
})

//console.log(fileContract)

module.exports = fileContract