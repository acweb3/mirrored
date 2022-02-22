import { GQLResolvers } from "../graphql";
import { mutations } from "./mutations";
import { queries } from "./queries";
import { pubsub } from "../common/pubsub";

export const resolvers: GQLResolvers = {
	Query: {
		...queries,
	},
	Mutation: {
		...mutations,
	},
	Subscription: {
		bidReceived: {
			subscribe: async () => {
				return pubsub.asyncIterator([
					"BID_CREATED",
				]) as unknown as AsyncIterable<any>;
			},
		},
	},
};
