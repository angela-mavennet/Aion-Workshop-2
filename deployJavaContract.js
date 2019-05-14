const Web3 = require("aion-web3");

const web3 = new Web3(new Web3.providers.HttpProvider("Your node"));

const privateKey = "Your PK";
const account = web3.eth.accounts.privateKeyToAccount("Your privateKey");
console.log(account.address);
let path = require('path');
async function deploy() {

  //contract
  let jarPath = path.join(__dirname,'contracts','Counter.jar');
  //The contract we are trying to deploy here is taking one integer arguments upon deployment
  //initialize count = 703
  let data = web3.avm.contract.deploy(jarPath).args(['int'],[703,]).init();
  console.log(data);
  //construct a transaction
  const Tx = {
    from: account.address,
    data: data,
    gasPrice: 10000000000,
    gas: 5000000,
    type: '0x2' //AVM java contract deployment
  };


  const signedTx = await web3.eth.accounts.signTransaction(
      Tx, account.privateKey
    ).then((res) => signedCall = res); 

  console.log(signedTx);
  const receipt = await web3.eth.sendSignedTransaction( 
      signedTx.rawTransaction
    ).on('receipt', receipt => {
       console.log("Receipt received!\ntxHash =", receipt.transactionHash)
  });

  console.log(receipt);
  console.log("Contract Address: " + receipt.contractAddress);

}

deploy();



