import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const ButtonContainer = styled.button`
	font-family: brandon-grotesque;
	font-weight: 900;
	font-style: normal;
	text-transform: uppercase;
	letter-spacing: 0.1em;

	color: #fff;
	background-color: #272727;
	border-color: #272727;

	display: inline-block;
	width: 100%;
	height: auto;
	padding: 1em 2.5em;
	border-width: 0;
	text-align: center;
	cursor: pointer;

	line-height: 14px;
	letter-spacing: 0.1em;

	outline: none;

	transition: 0.1s opacity linear;

	&:disabled,
	&:active,
	&:focus,
	&:hover {
		opacity: 0.8;
	}

	${breakpoints.medium`
		width: auto;
	`}
`;
