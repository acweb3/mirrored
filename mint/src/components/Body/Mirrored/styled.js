import styled from "styled-components";

import { breakpoints } from "styles/breakpoints";

export const BorderLine = styled.div`
	content: " ";
	margin: 45px 20% 0;
	height: 2px;
	width: 60%;
	padding: 0 25%;
	border-bottom: 1px dashed;
`;

export const MirroredContainer = styled.div`
	position: absolute;
	z-index: -1;
	left: 0;
	right: 0;

	height: 100vh;

	overflow: hidden;

	${breakpoints.medium`
		top: -200px;
	`}
`;
