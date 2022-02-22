import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { ethers } from "ethers";
import { useToasts } from "react-toast-notifications";

import { Button } from "components/Button";
import { config } from "config";

import * as S from "./styled";

const errorMap = {
	AUCTION_NOT_FINISHED:
		"This auction is still in progress.  If this auction is over, it can take a few minutes to update the blockchain.",
	LOW_ETH: "Low balance",
	WRONG_SENDER:
		"This is not the address that we have listed as winner.  Please reach out to @0x_reefer",
	TOKEN_ALLOCATED: "This token has already been minted.",
};

const connect = async () => {
	if (window.ethereum) {
		await window.ethereum.request({ method: "eth_requestAccounts" });
		return new Web3(window.ethereum);
	}
};

export const Mint = ({ tokenId, bidAmount }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(undefined);
	const { addToast } = useToasts();

	const connectToWallet = async () => {
		try {
			// Reset error state
			setError(undefined);

			const provider = await detectEthereumProvider();

			if (provider === null) {
				setError("No web3 wallet provider detected");
				return;
			}

			const abi = (await import("./abi.json")).default;
			const web3 = await connect();
			const contract = new web3.eth.Contract(abi, config.contractId);
			const encodedData = contract.methods.mint(tokenId).encodeABI();
			// const value = web3.utils.toHex((15e16).toString());
			const value = Web3.utils.toWei(`${bidAmount}`, "ether");
			const hex = Web3.utils.toHex(value);
			const transactionParameters = {
				to: config.contractId,
				from: window.ethereum.selectedAddress,
				value: hex,
				data: encodedData,
			};
			const gasEstimate = await window.ethereum.request({
				method: "eth_estimateGas",
				params: [transactionParameters],
			});
			transactionParameters.gas = parseInt(1.2 * gasEstimate);

			setIsLoading(true);

			await contract.methods.mint(tokenId).send(transactionParameters);

			setIsLoading(false);

			addToast(`Token minted, view on opensea.`, {
				appearance: "success",
				autoDismiss: true,
			});
		} catch (e) {
			console.error(e);
			console.log(e);

			addToast(`${e}.`, {
				appearance: "error",
				autoDismiss: true,
			});

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
		<>
			<>
				<Button
					onClick={() => {
						if (!isLoading) {
							mintNFT();
						}
					}}
				>
					{isLoading ? <S.Loader /> : <>Mint</>}
				</Button>
				<S.Warning>
					If you've just won this auction, it can take a few minutes
					for the blockchain to update.
				</S.Warning>
				{error && <S.Error>{error}</S.Error>}
			</>
		</>
	);
};
