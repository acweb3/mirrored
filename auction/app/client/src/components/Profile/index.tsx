import React, { useState } from "react";

import { Button } from "components/Button";

import * as S from "./styled";
import { Login } from "./Login";
import { BidsHistory } from "components/Sidebar/BidsHistory";
import { useBidsQuery } from "../../graphql";
import { useAuthContext } from "contexts/Auth";

export const Profile: React.FC = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const { auth } = useAuthContext();

	const bids = useBidsQuery({
		variables: {
			input: {
				condition: {
					// # TODO => replace this
					ownerAddress: auth.user?.address ?? "0x0",
				},
			},
		},
		skip: !auth.user,
	});

	return (
		<S.Profile>
			{auth.user ? (
				<S.BasicProfile>
					<S.Avatar width={32} account={auth.user.address} />
					<Button
						onClick={() =>
							setIsExpanded((isExpanded) => !isExpanded)
						}
					>
						Current activity
					</Button>
				</S.BasicProfile>
			) : (
				<Login />
			)}
			<S.ExpandedProfile>
				{isExpanded && (
					<BidsHistory
						isPaintingHistory
						bids={
							bids.data?.bids?.edges?.map((edge) => edge.node) ??
							[]
						}
					/>
				)}
			</S.ExpandedProfile>
		</S.Profile>
	);
};
