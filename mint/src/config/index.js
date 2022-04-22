const requiredEnvVar = (envVar) => {
	if (!envVar) {
		throw new Error(`Environment variable ${envVar} missing`);
	}

	return envVar;
};

export const config = {
	flagshipURL: requiredEnvVar(process.env.REACT_APP_FLAGSHIP_URL),
	rinkebyAlchemyUrl: requiredEnvVar(
		process.env.REACT_APP_RINKEBY_ALCHEMY_URL
	),
	mainnetAlchemyUrl: requiredEnvVar(
		process.env.REACT_APP_MAINNET_ALCHEMY_URL
	),
	rinkebyContractAddress: requiredEnvVar(
		process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS
	),
	mainnetContractAddress: requiredEnvVar(
		process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS
	),
};
