import { DApp } from "./DAppContext";
import { IsMinting } from "./IsMintingContext";
import { TokenID } from "./TokenIDContext";

export const Contexts = ({ children }) => {
	return (
		<DApp>
			<IsMinting>
				<TokenID>{children}</TokenID>
			</IsMinting>
		</DApp>
	);
};
