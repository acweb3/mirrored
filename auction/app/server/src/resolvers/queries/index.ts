import * as auth from "./auth";
import * as bids from "./bids";
import * as paintings from "./paintings";

export const queries = {
	...auth,
	...bids,
	...paintings,
};
