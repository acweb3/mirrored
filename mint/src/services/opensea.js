import { isomorphicFetch } from "./isomorphicFetch";

export const opensea = {
	collectionStats: (collectionName) => {
		return isomorphicFetch(`/opensea/stats?collection=${collectionName}`);
	},
};
