import styled from "styled-components";

import { breakpoints } from "styles/breakpoints";

export const MenuButton = styled.button`
	cursor: pointer;
	display: block;
	margin: 0;
	color: #9c9c9c;

	width: 100%;
	border: none;
	height: 20px;
	background: #fff;

	font-size: 16px;
	font-family: europa;
	font-weight: 400;
	font-style: normal;
	text-transform: none;
	letter-spacing: 0.06em;

	margin-bottom: 40px;
`;

export const MobileNavContainer = styled.div`
	${breakpoints.medium`display: none;`}
`;
