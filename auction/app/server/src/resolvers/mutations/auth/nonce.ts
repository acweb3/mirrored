import { v4 as uuid } from "uuid";

import { GQLMutationResolvers } from "@/graphql";
import { pool } from "../../../database";

export const nonceAssignment: GQLMutationResolvers["nonceAssignment"] = {
	resolve: async (_x, { input }) => {
		const client = await pool.connect();

		const users = await client.query(
			`
			SELECT * from users
			WHERE address = $1;
		`,
			[input.walletAddress]
		);
		const user = users.rows.length ? users.rows.length : undefined;

		const nonce = uuid();

		if (user) {
			const users = await client.query(
				`
				UPDATE users
				SET nonce = $1
				WHERE address = $2
				RETURNING *;
			`,
				[nonce, input.walletAddress]
			);

			const [user] = users.rows;

			client.release();

			return {
				id: user.id,
				address: user.address,
				nonce: user.nonce,
			};
		} else {
			const newUsers = await client.query(
				`
				INSERT INTO users(
					id,
					address,
					nonce
				) VALUES($1, $2, $3) RETURNING *
			`,
				[uuid(), input.walletAddress, nonce]
			);

			const [user] = newUsers.rows;

			client.release();

			return {
				id: user.id,
				address: user.address,
				nonce: user.nonce,
			};
		}
	},
};
