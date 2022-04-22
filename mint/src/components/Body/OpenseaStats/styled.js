import { ReactComponent as UnstyledEthereumIcon } from "../../../assets/icons/ethereum.svg";
import styled from "styled-components";

export const EthereumIcon = styled(UnstyledEthereumIcon)`
	fill: #000;
	width: 8px;
	margin-left: 4px;
`;

export const OpenSeaVolumeAmount = styled.div``;

export const OpenSeaVolumeCopy = styled.div`
	margin-top: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-style: italic;
`;

export const OpenSeaStatsFigure = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 900;
	text-transform: uppercase;
	font-size: 18px;
	color: #000;
	padding: 12px 0;
`;

export const OpenSeaStatsLabel = styled.div`
	font-family: europa;
	font-weight: 300;
	font-style: normal;
	line-height: 1.8em;
	font-size: 14px;
	color: #666;
`;

export const OpenSeaStatsNumber = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const OpenseaStatsOpacity = styled.div`
	transition: opacity 400ms;
	opacity: ${(props) => (props.isActive ? 1 : 0)};
	display: flex;
	justify-content: center;

	& > ${OpenSeaStatsFigure} {
		margin-right: 36px;
		padding-right: 36px;
		border-right: 1px solid #666;

		&:last-of-type {
			border-right: none;
			margin-right: 0;
			padding-right: 0;
		}
	}
`;

export const OpenSeaStats = styled.div`
	margin-top: 34px;

	font-family: brandon-grotesque;
	font-style: normal;
`;
