import styled from "styled-components";

import { shadows } from "styles/shadows";
import { Avatar as UnstyledAvatar } from "components/Avatar";
import { breakpoints } from "../../styles/breakpoints";

export const Avatar = styled(UnstyledAvatar)`
	margin-top: 7px;
	margin-right: 6px;
`;

export const BasicProfile = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
`;

export const ExpandedProfile = styled.div`
	& > * {
		&:first-child {
			margin-top: 16px;
		}
	}
`;

export const Profile = styled.div`
	position: fixed;

	bottom: 48px;
	right: calc(50% - 150px);
	left: calc(50% - 150px);

	min-height: 80px;
	min-width: 300px;

	border-radius: 16px;

	background-color: #f0f0f0;
	color: #666;

	box-shadow: ${shadows.medium};

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px;

	${breakpoints.medium`
		right: 48px;
		left: auto;
	`}
`;
