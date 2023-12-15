// imports
const hre = require("hardhat");
const fs = require('fs');

// function to deploy the contracts
async function main() {

  //deploy the token
  const DOG = await hre.ethers.getContractFactory("DOGToken");
  const dog = await DOG.deploy();
  await dog.deployed();
  console.log("dog deployed to:", dog.address);


  // export the addresses
  fs.writeFileSync('src/abi/address.js', `
    export const dogAddress = "${dog.address}"

  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
