import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import { Button } from "components/Button";
import { config } from "config";

import * as S from "./styled";
import { TokenModal } from "./TokenModal";

const errorMap = {
	MAX_LIMIT_PER_BUYER: "Max limit per address reached",
	LOW_ETH: "Low balance",
	MAX_REACHED: "80/80 pieces have now been minted",
};

const connect = async () => {
	if (window.ethereum) {
		await window.ethereum.request({ method: "eth_requestAccounts" });
		return new Web3(window.ethereum);
	}
};

export const Mint = ({ isSarah }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [tokenId, setTokenId] = useState(undefined);
	const [error, setError] = useState(undefined);

	const connectToWallet = async () => {
		try {
			// Reset error state
			setError(undefined);

			const provider = await detectEthereumProvider();

			if (provider === null) {
				setError("No web3 wallet provider detected");
				return;
			}

			await provider.request({
				method: "eth_requestAccounts",
			});

			const abi = (await import("./abi.json")).default;
			const web3 = await connect();
			const contract = new web3.eth.Contract(abi, config.contractId);
			const encodedData = contract.methods.publicMint().encodeABI();
			const value = web3.utils.toHex((15e16).toString());
			const transactionParameters = {
				to: config.contractId,
				from: window.ethereum.selectedAddress,
				value: value,
				data: encodedData,
			};
			const gasEstimate = await window.ethereum.request({
				method: "eth_estimateGas",
				params: [transactionParameters],
			});
			transactionParameters.gas = parseInt(1.2 * gasEstimate);

			setIsLoading(true);

			const tx = await contract.methods
				.publicMint()
				.send(transactionParameters);

			setIsLoading(false);

			if (tx?.events?.Transfer?.returnValues?.tokenId) {
				setTokenId(tx.events.Transfer.returnValues.tokenId);
			}
		} catch (e) {
			console.error(e);
			console.log(e);

			if (e.message) {
				const [, errorMessage] = e.message.split(
					"execution reverted: "
				);
				if (errorMap[errorMessage]) {
					setError(errorMap[errorMessage]);
				} else if (e.message.includes("insufficient funds")) {
					setError("Insufficient funds");
				} else {
					setError("Something went wrong.");
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	const mintNFT = async () => {
		await connectToWallet();
	};

	return (
		<S.Container>
			{!isSarah && (
				<Button
					disabled
					onClick={() => {
						if (!isLoading) {
							// mintNFT();
						}
					}}
				>
					SOLD OUT
					{/* {isLoading ? <S.Loader /> : <>SOLD OUT</>} */}
				</Button>
			)}

			{isSarah && (
				<Button
					onClick={() => {
						if (!isLoading) {
							mintNFT();
						}
					}}
				>
					{isLoading ? <S.Loader /> : <>Mint</>}
				</Button>
			)}

			<a href="https://opensea.io/collection/mirroredcm">
				<Button>Check secondary market</Button>
			</a>

			{error && <S.Error>{error}</S.Error>}

			{tokenId && <TokenModal tokenId={tokenId} />}
		</S.Container>
	);
};
