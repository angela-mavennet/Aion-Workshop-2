
/*******************deploy*******************/

//contract
  let jarPath = path.join(__dirname,'contracts','Counter.jar');
  //The contract we are trying to deploy here is taking one integer arguments upon deployment

  //initialize count = 703
  let data = web3.avm.contract.deploy(jarPath).args(['int'],[703]).init();
  console.log(data);
  //construct a transaction
  const Tx = {
    from: account.address,
    data: data,
    gasPrice: 10000000000,
    gas: 5000000,
    value: 0,
    type: '0x2'  //AVM Java Contract deployment type
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



 /*******************Contract Call*******************/
 const ctAddress = "0xa09235Ec0FB31F36c5bDca7D816dec2C087769C225978DF552d0361e2A2D5906";

   //calling method getString() which takes no argument, and returns a string
   let data = web3.avm.contract.method('getCount').inputs([],[]).encode();

    console.log(data);

    const Tx = {
      from: account.address,
      to: ctAddress,
      data: data,
      gasPrice: 10000000000,
      gas: 2000000,
      type: 0x1 //method call
    };


    let res = await web3.eth.call(Tx);
    let avmRes = await web3.avm.contract.decode('int', res); 
    console.log(avmRes);
    return avmRes;


 /*******************Send Transaction*******************/
   const ctAddress = "0xa09235Ec0FB31F36c5bDca7D816dec2C087769C225978DF552d0361e2A2D5906";

   //calling method incrementCounter() which takes one integer argument
 let data = web3.avm.contract.method('incrementCounter').inputs(['int'],[7]).encode();


  console.log(data);
  //construct a transaction
  const Tx = {
    from: account.address,
    to: ctAddress,
    data: data,
    gasPrice: 10000000000,
    gas: 2000000,
    type: 0x1
  };


//client signing
const signed = await web3.eth.accounts.signTransaction(
    Tx, account.privateKey
  ).then((res) => signedCall = res); 

console.log(signed);
const re = await web3.eth.sendSignedTransaction( signed.rawTransaction
  ).on('receipt', receipt => {
     console.log("Receipt received!\ntxHash =", receipt.transactionHash)
});

console.log(re);
console.log(re.logs[0].topics)  //make a note on event log


