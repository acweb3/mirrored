import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { useToasts } from "react-toast-notifications";

import {
	GQLAuthUser,
	useNonceAssignmentMutation,
	useValidateWalletLazyQuery,
} from "../../graphql";

interface Auth {
	authStep: string;
	error?: string;
	user?: GQLAuthUser;
}

export const useAuth = () => {
	const [auth, setAuth] = useState<Auth>({
		authStep: "Login",
		error: undefined,
		user: undefined,
	});
	const { addToast } = useToasts();

	const [nonceAssignment] = useNonceAssignmentMutation();
	const [validateWallet] = useValidateWalletLazyQuery();

	const handleLogin = async () => {
		try {
			if (!window.ethereum) {
				throw new Error("No ethereum wallet detected");
			}

			const provider = new ethers.providers.Web3Provider(
				window.ethereum as any
			);

			setAuth((auth) => ({
				...auth,
				authStep: "Requesting accounts",
			}));

			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();

			const walletAddress = await signer.getAddress();

			const nonceAssignmentResult = await nonceAssignment({
				variables: {
					input: {
						walletAddress,
					},
				},
			});

			if (nonceAssignmentResult.data) {
				setAuth((auth) => ({
					...auth,
					authStep: "Awaiting signature",
				}));

				const signature = await signer.signMessage(
					nonceAssignmentResult.data.nonceAssignment.nonce
				);

				setAuth((auth) => ({
					...auth,
					authStep: "Validating nonce",
				}));

				const validateWalletResult = await validateWallet({
					variables: {
						input: {
							condition: {
								address: walletAddress,
								signature,
								nonce: nonceAssignmentResult.data
									.nonceAssignment.nonce,
							},
						},
					},
				});

				if (validateWalletResult.data) {
					setAuth((auth) => ({
						...auth,
						user: validateWalletResult.data?.validateWallet,
					}));
				} else {
					throw new Error(
						validateWalletResult.error?.message ||
							"Error: could not validate nonce signature"
					);
				}
			} else {
				throw new Error("Error: could not assign nonce.");
			}
		} catch (e) {
			let errorMessage = `${e}`;

			if ((e as any)?.message) {
				errorMessage = (e as any)?.message;
			}

			setAuth((auth) => ({
				...auth,
				authStep: errorMessage,
				error: errorMessage,
			}));

			addToast(`${errorMessage}`, {
				appearance: "error",
				autoDismiss: true,
			});
		}
	};

	const getWalletBalance = useCallback(async () => {
		if (window.ethereum && auth.user) {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum as any
			);

			const ethBalance = await provider.getBalance(auth.user.address);
			return ethers.utils.formatEther(ethBalance);
		}
	}, [auth.user]);

	return {
		auth,
		getWalletBalance,
		handleLogin,
	};
};
