import { useIsMintingContext } from "../../contexts/IsMintingContext";
import { useTokenIDContext } from "../../contexts/TokenIDContext";
import { Mint } from "./Mint";
import { Mirrored } from "./Mirrored";
import { OpenseaStats } from "./OpenseaStats";
import { Randomer } from "./Randomer";
import * as S from "./styled";
import { useEffect, useState } from "react";

const TOKEN_OFFSET = 101;

export const Body = () => {
	const { tokenID } = useTokenIDContext();
	const [step, setStep] = useState(-1);
	const { isMinting } = useIsMintingContext();

	useEffect(() => {
		let sto;

		if (isMinting) {
			sto = setInterval(() => {
				setStep((step) => (step + 1) % 3);
			}, 3000);
		}

		return () => {
			clearTimeout(sto);
			if (isMinting) {
				setStep(777);
			}
		};
	}, [isMinting]);

	return (
		<S.BodyContainer>
			<Mirrored />

			<S.BodyContent>
				<Randomer />

				<OpenseaStats />

				<S.H1>
					{tokenID === undefined
						? "Mirrored"
						: `Reflection #${parseInt(tokenID) + TOKEN_OFFSET}`}
				</S.H1>
				<S.TextWrapper>
					<S.P>
						Welcome to Mirrored, a world of never ending sunsets and
						sunrises to get lost in. Mint your own endless
						reflection below and enjoy your stay 🤍
					</S.P>

					<S.P>0.15 ETH per Mint — Limit 2 mints per address.</S.P>

					<S.Message isActive={step === -1}>
						Welcome to Mirrored, a world of never ending sunsets and
						sunrises to get lost in. Mint your own endless
						reflection below and enjoy your stay 🤍
						<br />
						<br />
						0.15 ETH per Mint for public, 0.1 ETH per Mint for
						collectors
						<br />
						Limit 2 mints per address.
					</S.Message>

					<S.Message isActive={step === 0}>
						Creating your reflection now&hellip;
					</S.Message>
					<S.Message isActive={step === 1}>
						Transaction is confirming&hellip;
					</S.Message>
					<S.Message isActive={step === 2}>
						Waiting for the next block&hellip;
					</S.Message>
					<S.Message isActive={step === 777}>Thank you 🤍</S.Message>
				</S.TextWrapper>

				<S.ActionWrapper>
					<Mint />
				</S.ActionWrapper>
			</S.BodyContent>
		</S.BodyContainer>
	);
};
