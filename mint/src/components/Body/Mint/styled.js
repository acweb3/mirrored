import { ThreeDots } from "react-loading-icons";
import styled from "styled-components";
import { breakpoints } from "styles/breakpoints";

export const Loader = styled(ThreeDots)`
	width: 38px;
	height: 14px;
`;

export const Error = styled.span`
	color: #f00;
	font-style: italic;

	margin-left: 24px;
`;

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

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
