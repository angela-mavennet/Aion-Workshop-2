const Web3 = require("aion-web3");
const web3 = new Web3(new Web3.providers.HttpProvider("Your node"));

const privateKey = "Your PK";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account.address);


async function contractCall() {

  const ctAddress = "0xa029433F9D7CDab4C7F69a4D7046C22D6BD1107c9b09C59d9c04Ef304cDC665F";

   //calling method getCount() which takes no argument, and returns a string
   let data = web3.avm.contract.method('getCount').inputs([],[]).encode();

    console.log(data);

    const Tx = {
      from: account.address,
      to: ctAddress,
      data: data,
      gasPrice: 10000000000,
      gas: 2000000
    };


    let res = await web3.eth.call(Tx);
    let avmRes = await web3.avm.contract.decode('int', res); 
    console.log(avmRes);
    return avmRes;
}

contractCall();




