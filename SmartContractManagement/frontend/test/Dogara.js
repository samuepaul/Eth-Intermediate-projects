const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("DOGToken", function () {
  let DOG;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const dogContract = await ethers.getContractFactory("DOGToken");
    Dog = await dogContract.deploy();

    // Mint some tokens to the contract creator
    await Dog.mint(owner.address, 6);
  });

  it("Should return the correct name, symbol, and total supply", async function () {
    expect(await DOG.name()).to.equal("Eth DOGToken");
    expect(await DOG.symbol()).to.equal("DGT");
    expect(await DOG.totalSupply()).to.equal(12);
  });

  it("Should update balances after minting and burning tokens", async function () {
    // Mint some tokens to address 1
    await DOG.connect(owner).mint(addr1.address, 2);

    expect(await DOG.balances(addr1.address)).to.equal(2);
    expect(await DOG.totalSupply()).to.equal(14);

    // Burn some tokens from the contract creator
    await DOG.connect(owner).burn(3);

    expect(await DOG.balances(owner.address)).to.equal(9);
    expect(await DOG.totalSupply()).to.equal(11);
  });

  it("Should revert if an invalid address is provided to mint", async function () {
    await expect(DOG.connect(owner).mint("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", 1)).to.be.revertedWith("Invalid address");
  });

  it("Should revert if the contract creator doesn't have sufficient balance to burn", async function () {
    await expect(DOG.connect(owner).burn(16)).to.be.revertedWith("Insufficient balance");
  });
});
