import videoSrc from "../../../assets/images/video.mov";
import { useTokenIDContext } from "../../../contexts/TokenIDContext";
import { pullImage } from "../Mirrored/util/getUniques";
import * as S from "./styled";
import { useEffect, useState } from "react";

export const Randomer = () => {
	const [image, setImage] = useState(undefined);
	const { tokenID } = useTokenIDContext();

	useEffect(() => {
		const fetchImage = async () => {
			if (tokenID !== undefined) {
				const image = await pullImage(tokenID.toNumber() + 1);
				setImage(image);
			}
		};

		fetchImage();
	}, [tokenID]);

	return (
		<S.Randomer>
			{image && (
				<S.RandomerImageContainer>
					<S.RandomerImage src={image} />
				</S.RandomerImageContainer>
			)}
			<S.RandomerVideo src={videoSrc} muted autoPlay loop />
		</S.Randomer>
	);
};
