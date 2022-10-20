const assert = require("assert");
const ganache = require("ganache-cli");
// constructor
const Web3 = require("web3");
// instance thet has to connect to ganache local test network
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas:"1000000" })
});

describe("Inbox", () => {
    // 1 - verifies if the contract has been deployed
    it("deploys a contract", () => {
        assert.ok(inbox.options.address);
    });

    // 2 - verifies the initial message has been set correctly
    it("has a default message", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING)
    });

    // 3 - verifies the function that changes the message works correctly
    it("can change the message", async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    });
});

