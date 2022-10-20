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

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();
};
deploy();