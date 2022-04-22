import { breakpoints } from "../../../../styles/breakpoints";
import styled from "styled-components";

export const Asset = styled.div`
	display: flex;

	& > img {
		width: 100%;
		${breakpoints.extraSmall`
			width: auto;
		`}

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

	width: 200px;

	${breakpoints.extraSmall`
		width: auto;
	`}

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
	transform: translateZ(-200px) scale(1.5);

	/* align-items: center; */

	/* height: 60%; */
	overflow: hidden;
	/* filter: blur(3px); */

	perspective: 200px;

	& > ${Column} {
		margin-right: 12px;

		&:last-of-type {
			margin-right: 0;
		}
	}
`;
