import { createContext, useContext, useState } from "react";

export const TokenIDContext = createContext({});
export const useTokenIDContext = () => useContext(TokenIDContext);

export const TokenID = ({ children }) => {
	const [tokenID, setTokenID] = useState();

	return (
		<TokenIDContext.Provider value={{ tokenID, setTokenID }}>
			{children}
		</TokenIDContext.Provider>
	);
};
