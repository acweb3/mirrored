require("dotenv").config();

const config = {
	etherscanAPIKey: process.env.ETHERSCAN_API_KEY,
	ipfsURL: process.env.IPFS_URL,
	rinkebyAlchemyURL: process.env.RINKEBY_ALCHEMY_URL,
	rinkebyPrivateKey: process.env.RINKEBY_PRIVATE_KEY,
	ropstenAlchemyURL: process.env.ROPSTEN_ALCHEMY_URL,
	ropstenPrivateKey: process.env.ROPSTEN_PRIVATE_KEY,
	mainnetAlchemyURL: process.env.MAINNET_ALCHEMY_URL,
	mainnetPrivateKey: process.env.MAINNET_PRIVATE_KEY,
};

module.exports = {
	config,
};
