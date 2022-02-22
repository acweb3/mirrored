import { pool } from "../../../database";
import { makeCursor } from "../../../common/cursor";
import { GQLPaintings } from "@/graphql";

export const paintings = async (): Promise<GQLPaintings> => {
	const client = await pool.connect();

	const res = await client.query(
		`
		select painting.id, name, description, token_id, amount, owner_address, start
		from paintings as painting
		left join bids on painting.id = bids.painting_id
		WHERE bids.amount = (
		SELECT
			MAX(amount)
		from bids as bids2
		WHERE
			bids2.painting_id = painting.id
		) or bids.amount is null;
	`,
		[]
	);

	client.release();

	const edges = res.rows
		.sort((rowA, rowB) => rowA["token_id"] - rowB["token_id"])
		.map((row) => {
			const topBid =
				row.amount && row["owner_address"]
					? {
							amount: row.amount,
							ownerAddress: row["owner_address"],
					  }
					: null;

			return {
				cursor: makeCursor(row.id),
				node: {
					id: row.id,
					description: row.description,
					name: row.name,
					tokenID: row["token_id"],
					topBid,
					start: row.start,
				},
			};
		});

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
