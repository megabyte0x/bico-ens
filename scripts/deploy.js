const { ethers } = require("hardhat");

async function main() {

  try {
    const OffChainResolver = await ethers.getContractFactory("OffchainResolver.sol");
    const offChainResolver = await OffChainResolver.deploy(
        "https://bico-ens-resolver.vercel.app/{sender}/{data}.json",
        "['0x1Cb30cb181D7854F91c2410BD037E6F42130e860']"
    );
    await offChainResolver.deployed();
    console.log("Contract address:", offChainResolver.address);

    console.log("Sleeping.....");
    await sleep(40000);

    await hre.run("verify:verify", {
      address: offChainResolver.address,
      constructorArguments: ["https://bico-ens-resolver.vercel.app/{sender}/{data}.json",
      "['0x1Cb30cb181D7854F91c2410BD037E6F42130e860']"],
    });
  } catch (error) {
    console.error(error);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});