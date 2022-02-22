import { createContext, useContext } from "react";

import { GQLAuthUser } from "graphql";

interface AuthContextProps {
	auth: {
		authStep: string;
		error?: string;
		user?: GQLAuthUser;
	};
	handleLogin: () => Promise<void>;
	getWalletBalance: () => Promise<string | void>;
}
export const AuthContext = createContext<AuthContextProps>({
	auth: {
		authStep: "Login",
	},
	handleLogin: async () => {},
	getWalletBalance: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);
