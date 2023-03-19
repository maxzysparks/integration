const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");
const MyToken = require("./contracts/MyToken.sol");

async function deploy() {
  // Create a new instance of ContractKit
  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  const kit = ContractKit.newKitFromWeb3(web3);

  // Set the account that will deploy the contract
  const account = await kit.web3.eth
    .getAccounts()
    .then((accounts) => accounts[0]);
  kit.defaultAccount = account;

  // Create a new instance of the MyToken contract
  const contract = new kit.web3.eth.Contract(MyToken.abi);
  const bytecode = MyToken.bytecode;
  const gas = 1000000;
  const tx = contract.deploy({ data: bytecode, arguments: [1000000] });
  const receipt = await tx.send({ gas });
  const address = receipt.contractAddress;

  console.log(`MyToken deployed at address ${address}`);
}

deploy();
