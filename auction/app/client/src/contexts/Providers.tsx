import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { ToastProvider } from "react-toast-notifications";

import { ActiveImageContext } from "./ActiveImage";
import { AuthContext } from "./Auth";
import { apolloClient } from "common/apolloClient";
import { useAuth } from "common/hooks/useAuth";
import { GQLPainting } from "graphql";

const UserlandProvider: React.FC = ({ children }) => {
	const [activeImage, setActiveImage] = useState<GQLPainting | undefined>(
		undefined
	);
	const { auth, getWalletBalance, handleLogin } = useAuth();

	return (
		<AuthContext.Provider value={{ auth, handleLogin, getWalletBalance }}>
			<ActiveImageContext.Provider
				value={{ activeImage, setActiveImage }}
			>
				{children}
			</ActiveImageContext.Provider>
		</AuthContext.Provider>
	);
};

export const Providers: React.FC = ({ children }) => {
	return (
		<ApolloProvider client={apolloClient}>
			<ToastProvider>
				<UserlandProvider>{children}</UserlandProvider>
			</ToastProvider>
		</ApolloProvider>
	);
};
