import { v4 as uuid } from "uuid";
import * as jwt from "jsonwebtoken";

import { GQLBid, GQLMutationResolvers } from "@/graphql";
import { config } from "../../../config";
import { pool } from "../../../database";
import { pubsub } from "../../../common/pubsub";

export const bidAssignment: GQLMutationResolvers<{
	token: string;
}>["bidAssignment"] = {
	resolve: async (_: any, { input }, context): Promise<GQLBid> => {
		if (!context.token) {
			throw new Error("Not signed in");
		}

		if (!jwt.verify(context.token, config.jwtTokenKey)) {
			throw new Error("Session expired");
		}

		pubsub.publish("BID_CREATED", {
			bidCreated: {
				edges: [
					{
						node: {
							id: input.id,
						},
					},
				],
			},
		});

		const client = await pool.connect();

		const paintings = await client.query(
			`
			SELECT * from paintings
			WHERE id = $1;
		`,
			[input.paintingID]
		);

		const [painting] = paintings.rows;

		if (painting.start) {
			const then = new Date(painting.start);
			then.setDate(then.getDate() + 1);
			// then.setHours(then.getHours() + 1);

			const now = new Date();
			const diff = then.valueOf() - now.valueOf();

			if (diff < 0) {
				throw new Error("Auction is now over.");
			}
		}

		const bids = await client.query(
			`
			SELECT * from bids
			WHERE painting_id = $1;
		`,
			[input.paintingID]
		);

		const sortedBids = bids.rows.length
			? bids.rows
					.map<GQLBid>((bid: any) => ({
						...bid,
						ownerAddress: bid["owner_address"],
						timeStamp: bid["timestamp"],
					}))
					.sort((bidA, bidB) => {
						return bidB.amount - bidA.amount;
					})
			: null;

		const topBid = sortedBids
			? {
					amount: sortedBids[0].amount,
					ownerAddress: sortedBids[0].ownerAddress,
			  }
			: null;

		if (
			input.amount <
			(topBid?.amount ? topBid?.amount * 1.05 : config.reserve)
		) {
			throw new Error(
				`Bid price too low, current bid is ${
					topBid?.amount ? topBid?.amount : config.reserve
				}.  A bid of ${
					topBid?.amount ? topBid?.amount * 1.05 : config.reserve
				} (5% increase) will replace the highest bid.`
			);
		}

		const res = await client.query<GQLBid>(
			`
					INSERT INTO bids(
						id,
						amount,
						painting_id,
						owner_address,
						timestamp
					) VALUES($1, $2, $3, $4, $5) RETURNING *
				`,
			[
				uuid(),
				input.amount,
				input.paintingID,
				input.ownerAddress,
				new Date().toISOString(),
			]
		);

		if (!topBid) {
			await client.query(
				`
				UPDATE paintings
				SET start = now()
				WHERE id = $1
			`,
				[input.paintingID]
			);
		}

		client.release();

		const [bid] = res.rows;
		return bid;
	},
};
