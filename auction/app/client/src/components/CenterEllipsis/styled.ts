import styled from "styled-components";

export const OverflowWrapper = styled.div`
	overflow: hidden;
	width: 100%;
	position: relative;

	& > span,
	a {
		white-space: nowrap;

		// This targets our reference text and hides it from our user.
		&:nth-child(2) {
			position: absolute;
			left: 0;
			opacity: 0;
		}
	}
`;
