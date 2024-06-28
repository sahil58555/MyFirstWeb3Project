const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./compile");
const ganacheProvider = 'HTTP://127.0.0.1:7545';

// const provider = new HDWalletProvider(
//   "REPLACE_WITH_YOUR_MNEMONIC",
//   // remember to change this to your own phrase!
//   "REPLACE_WITH_YOUR_INFURA_URL"
//   // remember to change this to your own endpoint!
// );
const web3 = new Web3(ganacheProvider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  //provider.engine.stop();
};
deploy();
