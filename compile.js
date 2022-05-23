const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Generates a path that points directly to Inbox.sol file
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
// Reads raw source code
const source = fs.readFileSync(inboxPath, "utf8");

// Compiles the source code -> 1 contract -> access Inbox property
module.exports = solc.compile(source, 1).contracts[":Inbox"];
//console.log(solc.compile(source, 1));
