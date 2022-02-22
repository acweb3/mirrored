import styled, { css } from "styled-components";

export const Asset = styled.div`
	display: flex;

	& > img {
		border-radius: 4px;

		${(props) => {
			switch (props.column) {
				// case 0:
				// case 1: {
				// 	return `margin-left: auto;`;
				// }

				// case 3:
				// case 4: {
				// 	return `margin-right: auto;`;
				// }

				default:
					return `
                    margin-left: auto;
                    margin-right: auto;
                `;
			}
		}}
	}
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;

	& > ${Asset} {
		margin-bottom: 12px;

		&:last-of-type {
			margin-bottom: 0;
		}
	}
`;

export const ImageGridContainer = styled.div`
	display: flex;
	justify-content: center;
	/* align-items: center; */

	/* height: 60%; */
	overflow: hidden;

	/* filter: blur(0.8px); */

	${(props) => {
		return (
			props.isFlipped &&
			css`
				/* filter: blur(2px); */
				margin-top: -960px;
				transform-origin: 50% 100%;
				transform: perspective(600px) rotateX(10deg) rotateZ(180deg)
					rotateY(180deg);

				& > ${Asset} {
					transform: rotateY(180deg);
				}
			`
		);
	}}

	& > ${Column} {
		margin-right: 12px;

		&:last-of-type {
			margin-right: 0;
		}
	}
`;
