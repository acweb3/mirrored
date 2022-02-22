import { pool } from "../../../database";
import { GQLBid, GQLQueryResolvers } from "@/graphql";

export const painting: GQLQueryResolvers["painting"] = async (_, { input }) => {
	const client = await pool.connect();

	const paintings = await client.query(
		`
		SELECT * from paintings
        WHERE id = $1;
	`,
		[input?.condition?.id]
	);

	const [painting] = paintings.rows;

	const bids = await client.query(
		`
        SELECT * from bids
        WHERE painting_id = $1;
    `,
		[input?.condition?.id]
	);

	const sortedBids = bids.rows.length
		? bids.rows
				.map<GQLBid>((bid: any) => ({
					...bid,
					paintingID: bid["painting_id"],
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

	client.release();

	return {
		...painting,
		tokenID: painting["token_id"],
		topBid,
		bids: sortedBids,
	};
};
