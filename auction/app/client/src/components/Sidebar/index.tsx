import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import * as S from "./styled";
import { AuthBid } from "./AuthBid";
import { BidsHistory } from "./BidsHistory";
// import { Mint } from "./Mint";
import { Mint } from "components/Mint";
import { PlaceBid } from "./PlaceBid";
import { useCountdown } from "common/hooks/useCountdown";
import { useDocumentListener } from "common/hooks/useDocumentListener";
import { CenterEllipsis } from "components/CenterEllipsis";
import { useActiveImageContext } from "contexts/ActiveImage";
import { useAuthContext } from "contexts/Auth";
import {
	GQLPaintingBidFragment,
	GQLPainting,
	usePaintingQuery,
} from "../../graphql";
import { Button } from "../Button";

interface SidebarProps {
	painting: GQLPainting;
}
export const Sidebar: React.FC<SidebarProps> = ({ painting }) => {
	const { auth, handleLogin } = useAuthContext();
	const { setActiveImage } = useActiveImageContext();
	const [isBidding, setIsBidding] = useState(false);
	const { countdown, isCountdownComplete } = useCountdown(painting.start);

	const expandedPainting = usePaintingQuery({
		variables: {
			input: {
				condition: {
					id: painting.id,
				},
			},
		},
	});

	useEffect(() => {
		const sti = setInterval(() => {
			expandedPainting.refetch();
		}, 10000);

		return () => {
			clearInterval(sti);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [expandedPainting.refetch]);

	const bids: GQLPaintingBidFragment[] | undefined =
		(expandedPainting.data?.painting?.bids?.filter(
			Boolean
		) as GQLPaintingBidFragment[]) ?? undefined;

	const handleIsBidding = () => setIsBidding(true);

	useDocumentListener(
		"keydown",
		(e) => {
			if (e.key === "Escape") {
				setActiveImage(undefined);
			}
		},
		[]
	);

	return (
		<OutsideClickHandler onOutsideClick={() => setActiveImage(undefined)}>
			<S.Sidebar>
				<S.SidebarContent>
					<S.CloseButton
						onClick={() => setActiveImage(undefined)}
						tabIndex={0}
					>
						<S.CloseIcon />
					</S.CloseButton>

					<S.AuctionStats>
						<S.ImageContainer
							onClick={async () => {
								const src = await import(
									`assets/reflections/huge/reflection${painting.tokenID}.jpeg`
								);
								window.open(src.default, "_blank");
							}}
						>
							<S.ReflectionImage index={painting.tokenID} />
						</S.ImageContainer>
						{painting.topBid?.amount && (
							<S.ReflectionSubtitle>
								Top bid: {painting.topBid.amount}
								<S.EthereumIcon />
							</S.ReflectionSubtitle>
						)}
						{countdown &&
							isCountdownComplete !== undefined &&
							(isCountdownComplete ? (
								<S.ReflectionSubtitle>
									Auction won by:{" "}
									<CenterEllipsis
										text={
											painting.topBid?.ownerAddress ?? ""
										}
									/>
								</S.ReflectionSubtitle>
							) : (
								<S.ReflectionSubtitle>
									Ending in {countdown}
								</S.ReflectionSubtitle>
							))}
					</S.AuctionStats>

					<S.Description>
						<S.ReflectionTitle>{painting.name}</S.ReflectionTitle>
						<S.ReflectionSubtitle>
							Token #{painting.tokenID}
						</S.ReflectionSubtitle>

						<S.ReflectionCopy>
							{painting.description}
						</S.ReflectionCopy>

						{(isCountdownComplete === false || !painting.start) && (
							<S.BidSection>
								{!isBidding ? (
									<AuthBid
										handleIsBidding={handleIsBidding}
									/>
								) : (
									<PlaceBid painting={painting} />
								)}
							</S.BidSection>
						)}

						{isCountdownComplete === true &&
							painting.topBid &&
							painting.topBid?.ownerAddress ===
								auth.user?.address && (
								<S.BidSection>
									<Mint
										bidAmount={painting.topBid.amount}
										tokenId={painting.tokenID}
										// user={auth.user}
										// painting={painting}
										// topBid={painting.topBid}
									/>
								</S.BidSection>
							)}

						{isCountdownComplete === true && !auth.user && (
							<S.BidSection>
								<Button onClick={handleLogin}>Login</Button>
							</S.BidSection>
						)}

						{bids && <BidsHistory bids={bids} />}
					</S.Description>
				</S.SidebarContent>
			</S.Sidebar>
		</OutsideClickHandler>
	);
};
