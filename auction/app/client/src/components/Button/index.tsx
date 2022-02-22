import React from "react";

import * as S from "./styled";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return <S.ButtonContainer {...props}>{children}</S.ButtonContainer>;
};
