import styled from "styled-components";
import { ThreeDots } from "react-loading-icons";
import { breakpoints } from "styles/breakpoints";

export const Loader = styled(ThreeDots)`
	width: 38px;
	height: 14px;
`;

export const Warning = styled.span`
	display: block;
	padding-top: 16px;
	font-style: italic;
`;

export const Error = styled.span`
	display: block;
	color: #f00;
	display: block;
	font-style: italic;
`;

export const Container = styled.div`
	& > a {
		margin-top: 16px;
	}
	${breakpoints.medium`
		& > a {
			margin-top: 0;
			margin-left: 16px;
		}
	`}
`;
