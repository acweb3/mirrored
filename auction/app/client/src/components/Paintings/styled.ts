import styled from "styled-components";

import { Reflection as UnstyledReflection } from "components/Reflection";
import { breakpoints } from "styles/breakpoints";

export const Reflection = styled(UnstyledReflection)``;

export const Column = styled.div`
	display: flex;
	flex-direction: column;

	margin: 0 16px;

	${breakpoints.medium`
		margin: 0;
	`}

	& > ${Reflection} {
		margin-bottom: 48px;
	}
`;

export const Body = styled.div`
	margin-top: 24px;

	max-width: calc(916px + 64px);
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: column;

	${breakpoints.medium`
		flex-direction: row;

		& > ${Column} {
			&:first-of-type {
				margin-right: 32px;
			}
		}
	`}
`;
