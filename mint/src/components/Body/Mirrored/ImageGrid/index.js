import * as S from "./styled";

export const ImageGrid = ({ imagesGrid, isFlipped }) => {
	return (
		<S.ImageGridContainer isFlipped={isFlipped}>
			{imagesGrid.map((row, x) => {
				return (
					<S.Column key={x}>
						{row.map((column, y) => {
							return (
								<S.Asset key={y} column={x}>
									<img
										key={y}
										src={column}
										alt="background"
									/>
								</S.Asset>
							);
						})}
					</S.Column>
				);
			})}
		</S.ImageGridContainer>
	);
};
