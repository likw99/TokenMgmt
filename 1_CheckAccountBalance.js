const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/2771f59e5b2944d6b891b10bbb2b40c3' // Your RPC URL goes here
const web3 = new Web3(rpcURL)
const address = '0x1584dd516A23D5a7D5e199ea28FBd0e0B47F4a8A' // Your account address goes here

web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
  console.log('Balance of ' + address + ' is ' + balance + ' ether')
})
