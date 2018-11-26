const rpcURL = 'https://ropsten.infura.io/v3/2771f59e5b2944d6b891b10bbb2b40c3' // Your RCP URL goes here
const contractAddress = '0x298e318b9ae39f1b2831d4b748b527164f3ee02a' // Toke Contract
const owner = '0x1584dd516A23D5a7D5e199ea28FBd0e0B47F4a8A' // Owner
const user = '0xA8B39E8D6fc988ffE0b4Ca7e4b0660D40E35cf8a' // User
const manager = '0x9b2BC86Bdd10B804eA08EdA4C110D13DC2510FCc' // OperationMgr

let fs = require("fs");
let Web3 = require('web3');

let web3 = new Web3(rpcURL);
let source = fs.readFileSync("BeyondToken.json");
let abi = JSON.parse(source)["abi"];

const contract = new web3.eth.Contract(abi, contractAddress)

contract.methods.totalSupply().call((err, result) => { console.log('totalSupply: ' + result) })
contract.methods.name().call((err, result) => { console.log('name: ' + result) })
contract.methods.symbol().call((err, result) => { console.log('symbol: ' + result) })
contract.methods.decimals().call((err, result) => { console.log('decimals: ' + result) })
contract.methods.cap().call((err, result) => { console.log('cap: ' + result) })
contract.methods.balanceOf(user).call((err, result) => {
  console.log("balance of " + user + ": " + result)
})
