import { useEffect, useState } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import * as S from "./styled";

export const SiteWrapper = ({ children }) => {
	const [isTestNet, setIsTestNet] = useState(false);

	useEffect(() => {
		/**
		 * Check for mainnet.
		 */
		const checkChain = async () => {
			const provider = await detectEthereumProvider();

			if (provider) {
				const web3 = new Web3(Web3.givenProvider);
				const chainId = await web3.eth.getChainId();

				if (chainId !== 1) {
					setIsTestNet(true);
				}

				provider.on("chainChanged", (chainId) => {
					// Handle the new chain.
					// Correctly handling chain changes can be complicated.
					// We recommend reloading the page unless you have good reason not to.
					window.location.reload();
				});
			}
		};

		checkChain();
	});

	return (
		<>
			{isTestNet && (
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
