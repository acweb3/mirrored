import * as http from "http";
import * as path from "path";
import { execute, subscribe } from "graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as express from "express";

import { typeDefs } from "./graphql";
import { resolvers } from "./resolvers";

async function startApolloServer() {
	const app = express();
	app.use(express.static(path.join(__dirname, "..", "build")));

	app.get("/health", (req, res) => res.status(200).send({ status: "OK" }));

	const schema = makeExecutableSchema({ typeDefs, resolvers });
	const httpServer = http.createServer(app);

	const subscriptionServer = SubscriptionServer.create(
		{
			// This is the `schema` we just created.
			schema,
			// These are imported from `graphql`.
			execute,
			subscribe,
			onConnect() {
				console.log("Connected!");
			},
			onDisconnect() {
				console.log("Disconnected!");
			},
		},
		{
			// This is the `httpServer` we created in a previous step.
			server: httpServer,
			// Pass a different path here if your ApolloServer serves at
			// a different path.
			path: "/graphql",
		}
	);

	const server = new ApolloServer({
		schema,
		context: ({ req }) => {
			// get the user token from the headers
			const token = req.headers.authorization || "";
			return { token };
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
	});

	await server.start();
	server.applyMiddleware({ app });

	await new Promise<void>((resolve) =>
		httpServer.listen({ port: process.env.PORT ?? 4000 }, resolve)
	);
	console.log(
		`🚀 Server ready at port ${process.env.PORT ?? 4000}/${
			server.graphqlPath
		}`
	);
}

startApolloServer();
