import React from "react";

import * as S from "./styled";
import { formatDate } from "common/date";
import { CenterEllipsis } from "components/CenterEllipsis";
import { useActiveImageContext } from "contexts/ActiveImage";
import {
	GQLActivityBidFragment,
	GQLPainting,
	GQLPaintingBidFragment,
	usePaintingsQuery,
} from "../../../graphql";

interface BidsHistoryProps {
	bids: GQLActivityBidFragment[] | GQLPaintingBidFragment[];
	isPaintingHistory?: boolean;
}
export const BidsHistory: React.FC<BidsHistoryProps> = ({
	isPaintingHistory,
	bids,
}) => {
	const { activeImage, setActiveImage } = useActiveImageContext();
	const paintings = usePaintingsQuery({
		variables: {
			input: {},
		},
	});

	const paintingsIdTokenIDMap =
		paintings.data?.paintings?.edges?.reduce<Record<string, GQLPainting>>(
			(acc, painting) => {
				return {
					...acc,
					[painting.node.id]: painting.node,
				};
			},
			{}
		) || {};

	return (
		<S.Bids>
			<S.RecentActivity>Recent activity</S.RecentActivity>
			<S.Scroll>
				{bids.length ? (
					bids.map((bid, i) => {
						const associatedPainting =
							isPaintingHistory &&
							bid.paintingID !== "" &&
							paintingsIdTokenIDMap[bid.paintingID];

						return (
							<S.Bid
								key={i}
								hasClick={Boolean(
									!activeImage && associatedPainting
								)}
								onClick={
									!activeImage && associatedPainting
										? () => {
												setActiveImage(
													associatedPainting
												);
										  }
										: undefined
								}
							>
								{associatedPainting ? (
									<S.ReflectionThumbnail
										index={associatedPainting.tokenID}
									/>
								) : (
									<S.Avatar
										account={bid.ownerAddress}
										width={24}
									/>
								)}
								<S.BidDetails>
									<S.Address>
										{associatedPainting ? (
											<>{associatedPainting.name}</>
										) : (
											<CenterEllipsis
												text={bid.ownerAddress}
											/>
										)}
									</S.Address>

									<S.BidDate>
										{formatDate(new Date())}
									</S.BidDate>
								</S.BidDetails>

								<S.Price>
									<S.EthAmount>
										{bid.amount}
										<S.EthereumIcon />
									</S.EthAmount>

									{isPaintingHistory && (
										<div>
											{(bid as any).isTopBid
												? "(top bid)"
												: "(outbid)"}
										</div>
									)}
								</S.Price>
							</S.Bid>
						);
					})
				) : (
					<S.NoActivity>No recent activity</S.NoActivity>
				)}
			</S.Scroll>
		</S.Bids>
	);
};
