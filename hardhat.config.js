/* eslint-disable no-undef */
require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'hardhat',
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    // ropsten: {
    //   url: 'https://eth-ropsten.alchemyapi.io/v2/k9YRTWFcOsofZM7vmRezC4ofWl6BsKVv',
    //   accounts: [`0x${process.env.PRIVATE_KEY}`]
    // }
  }
};
