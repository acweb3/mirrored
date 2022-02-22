import styled from "styled-components";

import { Button as UnstyledButton } from "components/Button";
import { ReflectionImage as UnstyledReflectionImage } from "components/Reflection/ReflectionImage";

import { ReactComponent as UnstyledCloseIcon } from "assets/icons/close.svg";
import { ReactComponent as UnstyledEthereumIcon } from "assets/icons/ethereum.svg";
import { breakpoints } from "../../styles/breakpoints";

export const CloseIcon = styled(UnstyledCloseIcon)`
	color: #111;
	width: 24px;
	height: 24px;
`;

export const EthereumIcon = styled(UnstyledEthereumIcon)`
	height: 16px;
	margin-bottom: 2px;
	margin-left: 3px;
`;

export const Button = styled(UnstyledButton)`
	width: max-content;
`;

export const BidSection = styled.div`
	margin-bottom: 32px;
`;

export const CloseButton = styled.div`
	position: absolute;
	top: 0;
	right: 0;

	height: 28px;
	width: 28px;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;

	&:focus {
		outline: none;
		border: 1px dashed;
	}
`;

export const ReflectionImage = styled(UnstyledReflectionImage)`
	width: 100%;
`;

export const ImageContainer = styled.div`
	cursor: pointer;
`;

export const ReflectionTitle = styled.h2`
	font-size: 26px;
	font-family: europa;
	font-weight: 700;
	line-height: 1.2em;
	letter-spacing: 0.01em;
	margin: 0px 0 0.5em;

	color: #111;

	${breakpoints.medium`
		margin: 48px 0 0.5em;
	`}
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

	display: flex;
	align-items: center;
	white-space: nowrap;

	max-width: 300px;
`;

export const ReflectionCopy = styled.p`
	width: 75%;
	margin-bottom: 28px;
`;

export const AuctionStats = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;

	margin: 48px 0;

	${breakpoints.medium`
		margin: 0;
	`}
`;

export const Description = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;

	padding-bottom: 32px;

	${breakpoints.medium`
		margin-left: 32px;
		padding-bottom: 0;
	`}
`;

export const SidebarContent = styled.div`
	position: relative;

	height: 100%;

	display: flex;
	flex-direction: column;

	${breakpoints.medium`
		flex-direction: row;
	`}
`;

export const Sidebar = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;

	background: #fff;

	padding: 32px;

	width: 100%;

	overflow-y: scroll;

	${breakpoints.medium`
		width: 60%;
		padding: 32px 32px 32px 48px;
	`}
`;
