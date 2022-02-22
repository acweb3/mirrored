import styled from "styled-components";

import { ReactComponent as UnstyledEthereumIcon } from "assets/icons/ethereum.svg";

export const EthereumIcon = styled(UnstyledEthereumIcon)`
	color: #000;
	position: absolute;
	right: 8px;
`;

export const InputWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

export const BidSection = styled.div`
	display: flex;
	flex-direction: row;

	& > * {
		&:first-child {
			margin-right: 8px;
		}
	}
`;

export const CurrentBid = styled.div`
	white-space: nowrap;
	margin-right: 4px;
`;

export const CurrentPrice = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Disclaimer = styled.div``;

export const PlaceBid = styled.div`
	display: flex;
	flex-direction: column;
`;
