import * as S from "./styled";

export const Button = ({ children, ...props }) => {
	return <S.ButtonContainer {...props}>{children}</S.ButtonContainer>;
};
