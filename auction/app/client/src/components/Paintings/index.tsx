import { useActiveImageContext } from "contexts/ActiveImage";

import * as S from "./styled";
import { GQLPainting, usePaintingsQuery } from "../../graphql";
import { onClickAndEnterKey } from "common/helpers/onClickAndEnterKey";
import { useEffect } from "react";

const chunkByTwo = (arr: any[]) => {
	return arr.reduce(
		([a, b], next, i) => {
			if (i % 2 === 0) {
				return [[...a, next], b];
			}
			return [a, [...b, next]];
		},
		[[], []]
	);
};

export const Paintings = () => {
	const { setActiveImage } = useActiveImageContext();
	const paintings = usePaintingsQuery({
		variables: {
			input: {},
		},
	});

	useEffect(() => {
		setActiveImage((activeImage) => {
			if (activeImage) {
				const updatedPainting = paintings.data?.paintings?.edges?.find(
					(edge) => edge.node.id === activeImage.id
				);

				if (updatedPainting) {
					return updatedPainting.node;
				} else {
					return activeImage;
				}
			}

			return undefined;
		});
	}, [paintings.data, setActiveImage]);

	const chunkedPaintings: [GQLPainting[], GQLPainting[]] = chunkByTwo(
		paintings.data?.paintings?.edges?.map((edge) => edge.node) ?? []
	);

	return (
		<S.Body>
			{chunkedPaintings.map((paintings, column) => (
				<S.Column key={column}>
					{paintings.map((painting, row) => (
						<S.Reflection
							key={row}
							// index={column * 10 + row}
							painting={painting}
							{...onClickAndEnterKey(() =>
								setActiveImage(painting)
							)}
						/>
					))}
				</S.Column>
			))}
		</S.Body>
	);
};
