import styled from "styled-components";

import { Avatar as UnstyledAvatar } from "components/Avatar";
import { ReflectionImage as UnstyledReflectionImage } from "components/Reflection/ReflectionImage";

import { ReactComponent as UnstyledEthereumIcon } from "assets/icons/ethereum.svg";

export const ReflectionThumbnail = styled(UnstyledReflectionImage)`
	width: 32px;
`;

export const NoActivity = styled.div`
	width: 298px;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const RecentActivity = styled.div`
	font-family: europa;
	font-weight: 700;
	font-style: normal;
	line-height: 1.2em;
	text-transform: none;
	font-size: 26px;
	letter-spacing: 0.01em;
	font-size: 14px;

	color: #111;

	margin-bottom: 16px;
`;

export const Avatar = styled(UnstyledAvatar)`
	margin-top: 6px;
`;

export const Address = styled.div`
	width: 140px;
`;

export const EthereumIcon = styled(UnstyledEthereumIcon)`
	height: 16px;
	margin-bottom: 2px;
	margin-left: 3px;
`;

export const EthAmount = styled.div`
	display: flex;
	align-items: center;
`;

export const Price = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const BidDate = styled.div``;

export const BidDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

interface BidProps {
	hasClick?: boolean;
}
export const Bid = styled.div<BidProps>`
	position: relative;
	padding: 16px 16px 14px 8px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 16px;

	cursor: ${(props) => (props.hasClick ? "pointer" : "default")};

	&::after {
		content: " ";
		display: block;
		position: absolute;
		bottom: 0;
		left: 32px;
		width: calc(100% - 64px);
		height: 0;
		border-bottom: 1px dashed;
	}

	&:last-of-type {
		margin-bottom: 0;

		&::after {
			border-bottom: none;
		}
	}

	& > * {
		margin-right: 8px;
	}
`;

export const Scroll = styled.div`
	overflow-y: scroll;
	height: 300px;
	border: 1px dashed;
	scroll-snap-type: y mandatory;
`;

export const Bids = styled.div`
	overflow: hidden;
	max-width: 300px;
`;
