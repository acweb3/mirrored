import styled from "styled-components";

export const RandomerVideo = styled.video`
	width: 100%;
`;

export const RandomerImage = styled.img`
	width: 100%;
	margin: 0 auto;
`;

export const RandomerImageContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	height: 100%;
	width: 100%;
	z-index: 2;
	background: #fff;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Randomer = styled.div`
	position: relative;

	width: 66%;
	margin: 0 auto;

	display: flex;
	align-items: center;
	justify-content: center;

	overflow: hidden;
`;
