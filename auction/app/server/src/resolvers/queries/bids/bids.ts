import { GQLQueryResolvers } from "@/graphql";
import { makeCursor } from "../../../common/cursor";
import { pool } from "../../../database";

export const bids: GQLQueryResolvers["bids"] = async (_, { input }) => {
	const client = await pool.connect();

	const topBids = await client.query(
		`
		SELECT * 
		FROM bids WHERE (painting_id,amount) IN 
		(
			SELECT painting_id, MAX(amount)
			FROM bids
			GROUP BY painting_id
		);
	`,
		[]
	);

	const topBidMap = topBids.rows.reduce(
		(acc, topBid) => ({ ...acc, [topBid.id]: true }),
		{}
	);

	const res = await client.query(
		`
		SELECT * from bids
		WHERE owner_address = $1;
	`,
		[input.condition?.ownerAddress]
	);

	const edges = res.rows
		.sort(
			(bidA, bidB) =>
				new Date(bidB["timestamp"]).valueOf() -
				new Date(bidA["timestamp"]).valueOf()
		)
		.map((bid) => ({
			cursor: makeCursor(bid.id),
			node: {
				id: bid.id,
				amount: bid.amount,
				paintingID: bid["painting_id"],
				ownerAddress: bid["owner_address"],
				timeStamp: bid["timestamp"],
				isTopBid: topBidMap[bid.id],
			},
		}));

	client.release();

	return {
		pageInfo: {
			hasNextPage: false,
			hasPreviousPage: false,
			startCursor: edges[0].cursor,
			endCursor: edges[edges.length - 1].cursor,
		},
		edges,
	};
};
