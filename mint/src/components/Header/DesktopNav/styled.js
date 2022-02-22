import styled from "styled-components";

import { breakpoints } from "styles/breakpoints";

export const Link = styled.a`
	text-decoration: none;

	font-family: Arial, sans-serif;
	font-weight: normal;
	text-transform: normal;
	letter-spacing: 0px;
	font-family: europa;
	font-weight: 400;
	font-style: normal;
	text-transform: none;
	letter-spacing: 0.06em;
	font-size: 14px;

	line-height: 28px;
	display: inline-block;

	color: #9c9c9c;

	&:hover {
		color: #000;
	}
`;

export const LinkItem = styled.li`
	margin-right: 34px;
	position: relative;

	display: inline;
	float: none;
`;

export const LinksList = styled.ul`
	list-style: none;
	list-style-position: initial;
	list-style-image: none;
	list-style-type: none;

	font-family: europa;
	font-weight: 300;
	font-style: normal;
	line-height: 1.8em;
	font-size: 14px;
	letter-spacing: 0.04em;

	display: none;
	justify-content: center;

	margin: 0;

	${breakpoints.medium`
		display: flex;
	`}
`;

export const DesktopNavContainer = styled.nav``;
