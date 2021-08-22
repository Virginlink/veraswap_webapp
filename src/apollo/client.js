import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://api.thegraph.com/subgraphs/name/nodeberryinc/veraswap-dev",
	cache: new InMemoryCache(),
	connectToDevTools: process.env.NODE_ENV === "development",
});
