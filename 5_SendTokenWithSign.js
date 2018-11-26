var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
const fs = require("fs")

const web3 = new Web3('https://ropsten.infura.io/v3/2771f59e5b2944d6b891b10bbb2b40c3')

const manager = '0x9b2BC86Bdd10B804eA08EdA4C110D13DC2510FCc' // OperationMgr
const user = '0x406e51f57BE0BcB65e3Abb81e15C82767C3baDf1' // User

const privateKeyMgr = Buffer.from(process.env.PRIVATE_KEY_MGR, 'hex')

const contractAddress = '0x298e318b9ae39f1b2831d4b748b527164f3ee02a' // Token Contract Address
let source = fs.readFileSync("BeyondToken.json");
let abi = JSON.parse(source)["abi"];
const contract = new web3.eth.Contract(abi, contractAddress)

const tokenAmount = web3.utils.toWei('1', 'ether') // Only works with token decimals(18) is the same as ether

web3.eth.getTransactionCount(manager, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to:       contractAddress,
    data:     contract.methods.transfer(user, tokenAmount).encodeABI()
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKeyMgr)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  console.log('Send ' + tokenAmount + ' token from ' + manager + 'to ' + user + '...')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
