import { useChainConfig } from "./useChainConfig";
import { useCall } from "@usedapp/core";

export const useTotalSupply = () => {
	const { contract } = useChainConfig();
	const totalSupplyCall = useCall({
		contract,
		method: "totalSupply",
		args: [],
	});
	const totalSupply = totalSupplyCall?.value?.[0] ?? 0;

	return {
		totalSupply,
	};
};
