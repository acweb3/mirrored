import styled from "styled-components";
import { ThreeDots } from "react-loading-icons";

import { Button as UnstyledButton } from "components/Button";

export const Loader = styled(ThreeDots)`
	width: 38px;
	height: 14px;
`;

export const Error = styled.span`
	color: #f00;
	font-style: italic;

	margin-left: 24px;
`;

export const Button = styled(UnstyledButton)`
	width: max-content;
`;
