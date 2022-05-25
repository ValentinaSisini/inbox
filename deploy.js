const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
// ottiene un'istanza del provider
const provider = new HDWalletProvider(
    'way daughter ahead hunt warm eyebrow artefact flame summer toe execute gather',
    'https://rinkeby.infura.io/v3/eb389c98fdeb4f559178b8def434948e'
)
// ottiene un'istanza di web3 completamente abilitata per la rete Rinkeby
const web3 = new Web3(provider);