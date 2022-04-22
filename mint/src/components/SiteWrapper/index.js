import * as S from "./styled";
import { useEthers } from "@usedapp/core";

export const SiteWrapper = ({ children }) => {
	const ethers = useEthers();

	return (
		<>
			{ethers.library?.network?.chainId !== 1 && (
				<S.TestNetBanner>
					You are currently on a test network. Please change to
					mainnet.
				</S.TestNetBanner>
			)}
			<S.Global />
			<S.SiteWrapperContainer>{children}</S.SiteWrapperContainer>
		</>
	);
};
