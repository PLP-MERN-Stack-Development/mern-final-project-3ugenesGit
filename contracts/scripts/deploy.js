const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);

  const RewardToken = await hre.ethers.getContractFactory('RewardToken');
  const token = await RewardToken.deploy();
  await token.deployed();

  console.log('RewardToken deployed to:', token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

