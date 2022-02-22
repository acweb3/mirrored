import styled from "styled-components";

export const Shadow = styled.div`
	z-index: 2;
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	height: 100vh;
	width: 100vw;

	background: rgba(0, 0, 0, 0.3);
`;

export const Modal = styled.div`
	height: 400px;
	width: 50%;

	background: #fff;

	padding-left: 40px;

	display: flex;
	align-items: center;
`;

export const Content = styled.div`
	padding-left: 40px;
	padding-right: 80px;
	font-size: 1.1rem;

	flex: 1;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
