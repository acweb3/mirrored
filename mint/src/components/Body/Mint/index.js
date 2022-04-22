import { useChainConfig } from "../../../common/hooks/useChainConfig";
import { useTotalSupply } from "../../../common/hooks/useTotalSupply";
import { useIsMintingContext } from "../../../contexts/IsMintingContext";
import { useMint } from "./hooks/useMint";
import * as S from "./styled";
import { useCall, useEthers } from "@usedapp/core";
import { Button } from "components/Button";

export const Mint = () => {
	const { contract, openseaURL } = useChainConfig();
	const { activateBrowserWallet, account } = useEthers();
	const { mint, error } = useMint();
	const { isMinting } = useIsMintingContext();

	const isActiveCall = useCall({
		contract,
		method: "isActive",
		args: [],
	});
	const isActive = isActiveCall?.value?.[0] ?? false;
	const { totalSupply } = useTotalSupply();

	return (
		<S.Container>
			<Button
				disabled={account && !isActive}
				onClick={account ? mint : activateBrowserWallet}
			>
				{(() => {
					if (!account) {
						return <>Connect</>;
					}

					if (isMinting) {
						return <S.Loader />;
					}

					if (!isActive) {
						return <>Mint is not live</>;
					}

					return <>Mint</>;
				})()}
			</Button>

			{totalSupply > 0 ? (
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://${openseaURL}.io/assets/${contract.address}/0`}
				>
					<Button>Check secondary market</Button>
				</a>
			) : (
				<a target="#">
					<Button disabled>Secondary Market Is Not Live</Button>
				</a>
			)}
			{error && <S.Error>{JSON.stringify(error)}</S.Error>}
		</S.Container>
	);
};
