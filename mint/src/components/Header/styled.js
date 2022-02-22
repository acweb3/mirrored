import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const Logo = styled.img`
	max-height: 100%;
	max-width: 100%;
`;

export const LogoLink = styled.a`
	outline: none;
	height: 100%;
`;

export const HeaderWrapper = styled.div`
	height: 100%;
`;

export const LogoHeader = styled.h1`
	height: 67px;

	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const HeaderContainer = styled.div`
	background: #fff;
	z-index: 2;

	padding: 15px 0 90px;

	${breakpoints.medium`
		padding: 50px;
	`}
`;
