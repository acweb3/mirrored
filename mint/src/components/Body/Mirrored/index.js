import { useEffect, useState } from "react";
import { ImageGrid } from "./ImageGrid";

import * as S from "./styled";
import { pullImage, uniquesGrid } from "./util/getUniques";

export const Mirrored = () => {
	const [imagesGrid, setImagesGrid] = useState([[]]);

	useEffect(() => {
		const fetchImages = async () => {
			const uniqueImagesGrid = await Promise.all(
				uniquesGrid.map((row) => {
					return Promise.all(row.map(pullImage));
				})
			);
			setImagesGrid(uniqueImagesGrid);
		};

		fetchImages();
	}, []);

	return (
		<S.MirroredContainer>
			<ImageGrid imagesGrid={imagesGrid} />
			{/* <S.BorderLine />
			<ImageGrid isFlipped imagesGrid={imagesGrid} /> */}
		</S.MirroredContainer>
	);
};
