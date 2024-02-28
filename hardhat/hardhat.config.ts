import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    hardhat: {},
    base_sepolia: {
      url: 'https://rpc.testnet.base.com',
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 100000000000,
    },

    arbitrum_sepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
};

export default config;