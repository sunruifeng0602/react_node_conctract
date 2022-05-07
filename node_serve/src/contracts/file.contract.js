const Web3 = require('web3')

const {abi,ast} = require('./fileTransfer.json')

const web3 = new Web3('ws://localhost:7545')

web3.eth.defaultAccount = web3.eth.accounts[0];

const fileContract = new web3.eth.Contract(abi,'0xDc5e1129AB620eF12294c0fc2B61953E22c59e5C',{
    from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',
    gasPrice: '20000000000',
})

module.exports = fileContract