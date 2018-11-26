var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2771f59e5b2944d6b891b10bbb2b40c3')

const manager = '0x9b2BC86Bdd10B804eA08EdA4C110D13DC2510FCc' // OperationMgr
const user = '0x406e51f57BE0BcB65e3Abb81e15C82767C3baDf1' // User

const privateKeyMgr = Buffer.from(process.env.PRIVATE_KEY_MGR, 'hex')
const etherAmount = '0.1'

web3.eth.getTransactionCount(manager, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       user,
    value:    web3.utils.toHex(web3.utils.toWei(etherAmount, 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKeyMgr)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  console.log('Send ' + etherAmount + ' ether from ' + manager + ' to ' + user + '...')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
