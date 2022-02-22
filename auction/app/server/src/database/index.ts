import { Pool } from "pg";

import { config } from "../config";

export const pool = new Pool({
	user: config.postgresUser,
	host: config.postgresHost,
	database: config.postgresDb,
	password: config.postgresPassword,
	port: config.postgresPort,
});
