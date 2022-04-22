export const isomorphicFetch = async (...fetchParams) => {
	const res = await fetch(...fetchParams);
	return res.json();
};
