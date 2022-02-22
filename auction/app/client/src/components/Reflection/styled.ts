import styled, { css } from "styled-components";

import { ReflectionImage as UnstyledReflectionImage } from "components/Reflection/ReflectionImage";
import { breakpoints } from "styles/breakpoints";
import { shadows } from "styles/shadows";

import { ReactComponent as UnstyledEthereumIcon } from "assets/icons/ethereum.svg";

export const ReflectionImage = styled(UnstyledReflectionImage)`
	width: 100%;

	${breakpoints.medium`
		width: 450px;
	`}
`;

export const ReflectionTitle = styled.h2`
	font-size: 26px;
	font-family: europa;
	font-weight: 700;
	line-height: 1.2em;
	letter-spacing: 0.01em;
	margin: 1em 0 0.5em;

	color: #111;
`;

export const ReflectionSubtitle = styled.span`
	font-family: europa;
	font-weight: 700;
	font-style: normal;
	line-height: 1.2em;
	text-transform: none;
	font-size: 26px;
	letter-spacing: 0.01em;
	font-size: 14px;

	color: #111;
`;

export const Description = styled.div`
	padding-bottom: 16px;
`;

export const Card = styled.div`
	padding: 16px 16px 0;
`;

export const Countdown = styled.div`
	margin-left: auto;
`;

export const Ending = styled.div`
	display: flex;
	flex-direction: row;
	min-width: 200px;
	white-space: nowrap;
	text-align: right;
`;

export const Price = styled.div`
	display: flex;
	align-items: center;
`;

export const EthereumIcon = styled(UnstyledEthereumIcon)`
	height: 16px;
	margin-bottom: 2px;
	margin-left: 3px;
`;

interface BidsProps {
	isActive: boolean;
}
export const Bids = styled.div<BidsProps>`
	padding: 16px;
	color: #fff;

	transition: background 1s;

	background: ${(props) => (props.isActive ? "#128046" : "#111")};

	display: flex;
	justify-content: space-between;
`;

interface ReflectionProps {
	isSolo?: boolean;
}
export const Reflection = styled.div<ReflectionProps>`
	min-height: 400px;
	position: relative;

	transition: box-shadow 0.4s, transform 0.4s;

	box-shadow: ${shadows.medium};

	${(props) =>
		props.onClick &&
		css`
			cursor: pointer;

			&:focus,
			&:hover {
				outline: none;
				box-shadow: ${shadows.high};
				transform: translateY(-2px);
			}
		`}
`;
