import React from "react";

import * as S from "./styled";
import { GQLPainting } from "graphql";
import { useCountdown } from "../../common/hooks/useCountdown";
import { CenterEllipsis } from "../CenterEllipsis";

interface ReflectionProps {
	className?: string;
	onClick: (e: React.MouseEvent) => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
	painting: GQLPainting;
	isSolo?: boolean;
}
export const Reflection: React.FC<ReflectionProps> = ({
	className,
	painting,
	...props
}) => {
	const { countdown, isCountdownComplete } = useCountdown(painting.start);

	return (
		<S.Reflection tabIndex={0} className={className} {...props}>
			<S.Card>
				<S.ReflectionImage index={painting.tokenID} />
				<S.Description>
					<S.ReflectionTitle>{painting.name}</S.ReflectionTitle>
					<S.ReflectionSubtitle>
						Token #{painting.tokenID}
					</S.ReflectionSubtitle>
				</S.Description>
			</S.Card>
			<S.Bids isActive={!!painting.topBid?.amount}>
				{painting.topBid?.amount ? (
					<S.Price>
						Current bid: {painting.topBid.amount}
						<S.EthereumIcon />
					</S.Price>
				) : (
					<S.Price>
						Reserve: 0.2
						<S.EthereumIcon />
					</S.Price>
				)}
				{countdown && isCountdownComplete !== undefined && (
					<S.Ending>
						{!isCountdownComplete ? (
							<S.Countdown>Ending in {countdown}</S.Countdown>
						) : (
							<>
								Auction won:{" "}
								<CenterEllipsis
									text={painting.topBid?.ownerAddress ?? ""}
								/>
							</>
						)}
					</S.Ending>
				)}
			</S.Bids>
		</S.Reflection>
	);
};
