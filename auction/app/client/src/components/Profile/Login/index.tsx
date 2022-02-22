import React from "react";

import * as S from "./styled";
import { useAuthContext } from "contexts/Auth";

export const Login: React.FC = () => {
	const { auth, handleLogin } = useAuthContext();

	return <S.Button onClick={handleLogin}>{auth.authStep}</S.Button>;
};
