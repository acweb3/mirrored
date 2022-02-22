import { v4 as uuid } from "uuid";
import { ethers } from "ethers";
import * as jwt from "jsonwebtoken";

import { GQLQueryResolvers } from "@/graphql";
import { pool } from "../../../database";
import { config } from "../../../config";

export const validateWallet: GQLQueryResolvers["validateWallet"] = async (
	_,
	{ input }
) => {
	const {
		condition: { address, signature, nonce },
	} = input;
	const signerAddress = ethers.utils.verifyMessage(nonce, signature);

	if (signerAddress !== address) {
		throw new Error("Wrong signature");
	}

	const client = await pool.connect();
	const users = await client.query(
		`
		SELECT * from users
		WHERE address = $1;
	`,
		[address]
	);
	const [user] = users.rows;

	const token = jwt.sign({ address }, config.jwtTokenKey, {
		expiresIn: "1h",
	});

	client.release();

	return {
		id: user.id,
		address: user.address,
		token,
	};
};
