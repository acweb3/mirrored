import styled from "styled-components";

import { breakpoints } from "styles/breakpoints";
import { shadows } from "styles/shadows";

export const H1 = styled.h1`
	font-family: europa;
	font-weight: 700;
	font-style: normal;
	line-height: 1.2em;
	text-transform: none;
	font-size: 26px;
	letter-spacing: 0.01em;
	margin: 1em 0 0.5em;

	color: #000;

	text-align: center;

	margin-bottom: 34px;
`;

export const P = styled.p`
	font-family: europa;
	font-weight: 300;
	font-style: normal;
	line-height: 1.8em;
	font-size: 14px;
	letter-spacing: 0.04em;
	margin: 0 0 1em;

	${(props) =>
		props.isSarah &&
		`
		cursor: pointer;
		text-decoration: underline;
	`}
`;

export const ActionWrapper = styled.div`
	margin-top: 34px;
`;

export const BodyContent = styled.div`
	flex: 0 0 90%;
	padding: 32px 8%;
	background: white;

	box-shadow: ${shadows.high};

	${breakpoints.large`
		flex: 0 0 66.6667%;

		margin-top: 32px;
	`}
`;

export const BodyContainer = styled.section`
	margin-top: 45px;

	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
`;
