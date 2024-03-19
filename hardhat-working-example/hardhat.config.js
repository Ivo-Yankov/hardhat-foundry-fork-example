require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: 'relay',
  networks: {

    relay: {
      accounts: [
        "0x105d050185ccb907fba04dd92d8de9e32c18305e097ab41dadda21489a211524",
      ],
      url: "http://localhost:7546"
    },

    hardhat: {
      forking: {
        enabled: true,
        url: "http://localhost:7546",
      }
    }
  }
};
