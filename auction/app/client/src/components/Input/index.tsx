import React from "react";

import * as S from "./styled";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
	return <S.Input {...props} />;
};
