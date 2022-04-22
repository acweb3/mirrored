import styled, { css } from "styled-components";
import { breakpoints } from "styles/breakpoints";
import { shadows } from "styles/shadows";

export const TextWrapper = styled.div`
	position: relative;
`;

export const Message = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #fff;

	text-align: center;

	font-family: europa;
	font-weight: 300;
	font-style: normal;
	line-height: 1.8em;
	font-size: 14px;
	letter-spacing: 0.04em;
	margin: 0 0 1em;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;

	transition: opacity 400ms, transform 400ms;
	opacity: 0;
	transform: translate3d(0, 34px, 34px);

	${(props) =>
		props.isActive &&
		css`
			opacity: 1;
			transform: initial;
		`}
`;

export const H1 = styled.h1`
	font-family: europa;
	font-weight: 700;
	font-style: normal;
	line-height: 1.2em;
	text-transform: none;
	font-size: 26px;
	letter-spacing: 0.01em;
	margin: 2em 0 0.5em;

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
	text-align: center;

	opacity: 0;

	${(props) =>
		props.isSarah &&
		`
		cursor: pointer;
		text-decoration: underline;
	`}
`;

export const ActionWrapper = styled.div`
	margin-top: 68px;
`;

export const BodyContent = styled.div`
	flex: 0 0 66%;
	padding: 90px 68px 45px;
	background: white;
	max-width: 100vw;

	min-width: 100vw;

	box-shadow: ${shadows.high};

	${breakpoints.extraSmall`
		min-width: auto;
	`}

	${breakpoints.large`
		flex: 0 0 66.6667%;

		margin-top: 32px;
	`}
`;

export const BodyContainer = styled.section`
	margin-top: 180px;

	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;

	${breakpoints.extraSmall`
		margin-bottom: 180px;
	`}
`;
