import styled from "styled-components";

export const BorderLine = styled.div`
	content: " ";
	margin: 45px 20% 0;
	height: 2px;
	width: 60%;
	padding: 0 25%;
	border-bottom: 1px dashed;
`;

export const MirroredContainer = styled.div`
	position: fixed;
	z-index: -1;
	left: 0;
	top: 0;

	height: 100vh;
	width: 100vw;
`;
