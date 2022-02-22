import * as dotenv from "dotenv";

dotenv.config();

const requiredEnvVar = (envVar?: string) => {
	if (!envVar) {
		throw new Error(`Environment variable ${envVar} missing`);
	}

	return envVar;
};

export const config = {
	postgresDb: requiredEnvVar(process.env.POSTGRES_DB),
	postgresUser: requiredEnvVar(process.env.POSTGRES_USER),
	postgresPassword: requiredEnvVar(process.env.POSTGRES_PASSWORD),
	postgresHost: requiredEnvVar(process.env.POSTGRES_HOST),
	postgresPort: parseInt(requiredEnvVar(process.env.POSTGRES_PORT)),
	reserve: 0.2,
	jwtTokenKey: requiredEnvVar(process.env.JWT_TOKEN_KEY),
};
