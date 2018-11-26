var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
const fs = require("fs")

const web3 = new Web3('https://ropsten.infura.io/v3/2771f59e5b2944d6b891b10bbb2b40c3')

const owner = '0x1584dd516A23D5a7D5e199ea28FBd0e0B47F4a8A' // Owner
const user = '0x406e51f57BE0BcB65e3Abb81e15C82767C3baDf1' // User

const privateKeyOwner = Buffer.from(process.env.PRIVATE_KEY_OWNER, 'hex')

const contractAddress = '0x298e318b9ae39f1b2831d4b748b527164f3ee02a' // Token Contract Address
let source = fs.readFileSync("BeyondToken.json");
let abi = JSON.parse(source)["abi"];
const contract = new web3.eth.Contract(abi, contractAddress)

const tokenAmount = web3.utils.toWei('1', 'ether') // Only works with token decimals(18) is the same as ether

web3.eth.getTransactionCount(owner, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to:       contractAddress,
    data:     contract.methods.mint(user, tokenAmount).encodeABI()
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKeyOwner)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  console.log('Mint ' + tokenAmount + ' token from ' + owner + 'to ' + user + '...')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
