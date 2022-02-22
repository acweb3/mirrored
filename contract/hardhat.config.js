/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { config } = require("./config");

module.exports = {
	solidity: {
		version: "0.8.7",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},

	networks: {
		mainnet: {
			url: config.mainnetAlchemyURL,
			accounts: [config.mainnetPrivateKey],
		},

		ropsten: {
			url: config.ropstenAlchemyURL,
			accounts: [config.ropstenPrivateKey],
		},

		rinkeby: {
			url: config.rinkebyAlchemyURL,
			accounts: [config.rinkebyPrivateKey],
			gas: 2100000,
			gasPrice: 8000000000,
		},
	},

	etherscan: {
		apiKey: config.etherscanAPIKey,
	},
};
