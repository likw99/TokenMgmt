const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2771f59e5b2944d6b891b10bbb2b40c3')

var account = web3.eth.accounts.create()
console.log(account)
