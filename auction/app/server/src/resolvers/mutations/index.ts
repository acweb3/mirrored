import { GQLMutationResolvers } from "../../graphql";
import * as auth from "./auth";
import * as bids from "./bids";

export const mutations: GQLMutationResolvers<any, {}> = {
	...auth,
	...bids,
};
