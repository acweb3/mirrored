import { createContext, useContext, useState } from "react";

export const IsMintingContext = createContext({});
export const useIsMintingContext = () => useContext(IsMintingContext);

export const IsMinting = ({ children }) => {
	const [isMinting, setIsMinting] = useState(false);

	return (
		<IsMintingContext.Provider value={{ isMinting, setIsMinting }}>
			{children}
		</IsMintingContext.Provider>
	);
};
