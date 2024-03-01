import { ethers } from 'hardhat';

async function main() {
  /**
   * Deploy the FundAProjectContributerNFT contract
   */
  const owner = '0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89';
  const fundAProjectContributerNFT = await ethers.deployContract('FundAProjectContributerNFT', [owner]);

  await fundAProjectContributerNFT.waitForDeployment();
  console.log(`Lock with ETH and unlock timestamp deployed to ${fundAProjectContributerNFT.target}`);

  /**
   * Deploy the FundAProject contract
   */
  const USDCAddress = '0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89';
  const ethPriceFeedAddress = '0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1'; // arbi  0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165
  const usdcPriceFeedAddress = '0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165'; // arbi 0x0153002d20B96532C639313c2d54c3dA09109309
  const fundAProject = await ethers.deployContract('FundAProject', [
    USDCAddress,
    fundAProjectContributerNFT.target,
    ethPriceFeedAddress,
    usdcPriceFeedAddress,
  ]);

  await fundAProject.waitForDeployment();
  console.log(`FundAProject deployed to ${fundAProject.target}`);

  /**
   * Set the FundAProjectContributerNFT contract as the minter for the FundAProject contract
   */
  await fundAProject.setMinter(fundAProjectContributerNFT.target);
  console.log(`FundAProjectContributerNFT set as minter for FundAProject`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
