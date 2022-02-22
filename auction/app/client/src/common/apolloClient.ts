import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import introspectionConfig from "graphql/introspection";
import { TypedTypePolicies } from "graphql/typePolicies";
import { getMainDefinition } from "@apollo/client/utilities";

const possibleTypes = introspectionConfig.possibleTypes;

const typePolicies: TypedTypePolicies = {
	AssetsGraph: {
		keyFields: false,
	},
	Query: {
		fields: {},
	},
};

const cache = new InMemoryCache({ possibleTypes, typePolicies });

const httpLink = new HttpLink({
	credentials: "same-origin",
	uri: "/graphql",
});

// Only temporarily blocked
const wsLink = new WebSocketLink({
	uri: `${window.location.protocol === "https:" ? "wss://" : "ws://"}${
		window.location.host
	}/graphql`,
	options: {
		reconnect: true,
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

export const apolloClient = new ApolloClient({
	cache,
	link: splitLink,
});
