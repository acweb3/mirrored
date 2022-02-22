const requiredEnvVar = (envVar?: string) => {
	if (!envVar) {
		throw new Error(`Environment variable ${envVar} missing`);
	}

	return envVar;
};

export const config = {
	flagshipURL: requiredEnvVar(process.env.REACT_APP_FLAGSHIP_URL),
	contractId: requiredEnvVar(process.env.REACT_APP_CONTRACT_ID),
	reserve: 0.2,
};
