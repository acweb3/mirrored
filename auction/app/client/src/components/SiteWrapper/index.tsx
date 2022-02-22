import React, { useEffect, useState } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import * as S from "./styled";

export const SiteWrapper: React.FC = ({ children }) => {
	const [isTestNet, setIsTestNet] = useState(false);

	// useEffect(() => {
	// 	/**
	// 	 * Check for mainnet.
	// 	 */
	// 	const checkChain = async () => {
	// 		const provider: any = await detectEthereumProvider();

	// 		if (provider) {
	// 			const web3 = new Web3(Web3.givenProvider);
	// 			const chainId = await web3.eth.getChainId();

	// 			if (chainId !== 1) {
	// 				setIsTestNet(true);
	// 			}

	// 			provider.on("chainChanged", () => {
	// 				// Handle the new chain.
	// 				// Correctly handling chain changes can be complicated.
	// 				// We recommend reloading the page.
	// 				window.location.reload();
	// 			});
	// 		}
	// 	};

	// 	checkChain();
	// });

	return (
		<>
			{/* {isTestNet && (
				<S.TestNetBanner>
					You are currently on a test network.Please change to
					mainnet.
				</S.TestNetBanner>
			)} */}
			<S.Global />
			<S.SiteWrapperContainer>{children}</S.SiteWrapperContainer>
		</>
	);
};
