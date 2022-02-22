import { useState } from "react";

import { Mint } from "./Mint";
import { Mirrored } from "./Mirrored";
import * as S from "./styled";

export const Body = () => {
	const [isSarah, setIsSarah] = useState(false);

	return (
		<S.BodyContainer>
			<Mirrored />

			<S.BodyContent>
				<S.H1>Mirrored</S.H1>
				<S.P>
					Welcome to Mirrored, a world of never ending sunsets and
					sunrises to get lost in. Mint your own endless sky below and
					enjoy your stay 🤍
				</S.P>

				<S.P>0.15 ETH per Mint — Limit 2 mints per address.</S.P>

				{!isSarah && (
					<S.P isSarah onClick={() => setIsSarah(true)}>
						Is your name sarah.eth?
					</S.P>
				)}

				<S.ActionWrapper>
					<Mint isSarah={isSarah} />
				</S.ActionWrapper>
			</S.BodyContent>
		</S.BodyContainer>
	);
};
