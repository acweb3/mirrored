import { createContext, useContext } from "react";

import { GQLPainting } from "graphql";

interface ActiveImageContextProps {
	activeImage: GQLPainting | undefined;
	setActiveImage: React.Dispatch<
		React.SetStateAction<GQLPainting | undefined>
	>;
}
export const ActiveImageContext = createContext<ActiveImageContextProps>({
	activeImage: undefined,
	setActiveImage: () => {},
});

export const useActiveImageContext = () => useContext(ActiveImageContext);
