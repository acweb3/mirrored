import { useChainConfig } from "../../../../common/hooks/useChainConfig";
import { useIsMintingContext } from "../../../../contexts/IsMintingContext";
import { useTokenIDContext } from "../../../../contexts/TokenIDContext";
import { reserve } from "./reserve";
import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useState } from "react";

export const useMint = () => {
	const { contract } = useChainConfig();
	const { account } = useEthers();
	const [error, setError] = useState(undefined);
	const { setIsMinting } = useIsMintingContext();
	const { setTokenID } = useTokenIDContext();

	const { send, state, events } = useContractFunction(contract, "blindMint", {
		transactionName: "Blind Mint",
	});

	useEffect(() => {
		if (state && state.status !== "None" && state.status !== "Success") {
			setIsMinting(true);
		} else {
			setIsMinting(false);
		}
	}, [state, setIsMinting]);

	useEffect(() => {
		if (
			events?.length &&
			events.find((event) => event.name === "Transfer")
		) {
			const transfer = events.find((event) => event.name === "Transfer");

			if (transfer.args.tokenId) {
				setTokenID(transfer.args.tokenId);
			}
		}
	}, [events, setTokenID]);

	const mint = async () => {
		setError(undefined);

		if (!account) {
			setError("No account connected");
			return;
		}

		try {
			if (reserve.includes(account.toLowerCase())) {
				await send(true, {
					value: utils.parseEther("0.1"),
				});
			} else {
				await send(false, {
					value: utils.parseEther("0.15"),
				});
			}
		} catch (e) {
			console.log(e);
			if (e?.code === 4001) {
				setError("User denied transaction signature");
			} else if (e.code && e.message.includes("execution reverted")) {
				const reason = e.message
					.split("execution reverted: ")?.[1]
					.split(",")[0];

				setError(reason ?? "Error");
			} else {
				setError(e);
			}
		}
	};

	return {
		mint,
		error,
	};
};
