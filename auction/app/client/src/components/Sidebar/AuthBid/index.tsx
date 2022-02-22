import React from "react";

import * as S from "./styled";
import { useAuthContext } from "contexts/Auth";

interface AuthBidProps {
	handleIsBidding: () => void;
}

export const AuthBid: React.FC<AuthBidProps> = ({ handleIsBidding }) => {
	const { auth, handleLogin } = useAuthContext();

	return (
		<>
			{auth.user ? (
				<S.Button onClick={handleIsBidding}>Place bid</S.Button>
			) : (
				<S.Button onClick={handleLogin}>{auth.authStep}</S.Button>
			)}
		</>
	);
};
