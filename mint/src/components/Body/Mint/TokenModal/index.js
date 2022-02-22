import { useEffect, useState } from "react";

import { config } from "config";
import * as S from "./styled";
import { pullImage } from "../../Mirrored/util/getUniques";

export const TokenModal = ({ tokenId }) => {
	const [imageSrc, setImageSrc] = useState(undefined);

	useEffect(() => {
		const fetchImageSrc = async () => {
			if (tokenId) {
				setImageSrc(await pullImage(tokenId));
			}
		};

		fetchImageSrc();
	}, [tokenId]);

	return (
		<S.Shadow>
			<S.Modal>
				{imageSrc && <img src={imageSrc} alt={`src for ${tokenId}`} />}
				<S.Content>
					<div>You've minted Reflection #{Number(tokenId) + 1}</div>
					<a
						href={`https://opensea.io/assets/${config.contractId}/${tokenId}`}
					>
						View on opensea
					</a>
				</S.Content>
			</S.Modal>
		</S.Shadow>
	);
};
