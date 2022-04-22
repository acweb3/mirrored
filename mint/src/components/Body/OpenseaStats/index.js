import { useTotalSupply } from "../../../common/hooks/useTotalSupply";
import * as S from "./styled";

export const OpenseaStats = () => {
	const stats = {
		owners: 74,
		volume: 19.948,
	};
	const { totalSupply } = useTotalSupply();

	return (
		<S.OpenSeaStats>
			<S.OpenseaStatsOpacity
				isActive={Boolean(stats.volume && stats.owners)}
			>
				<S.OpenSeaStatsFigure>
					<S.OpenSeaStatsNumber>
						{(stats.volume + parseInt(totalSupply) * 0.15).toFixed(
							3
						)}
						<S.EthereumIcon />
					</S.OpenSeaStatsNumber>
					<S.OpenSeaStatsLabel>total volume</S.OpenSeaStatsLabel>
				</S.OpenSeaStatsFigure>
				<S.OpenSeaStatsFigure>
					<S.OpenSeaStatsNumber>
						<div>{stats.owners + parseInt(totalSupply)}</div>
					</S.OpenSeaStatsNumber>
					<S.OpenSeaStatsLabel>total owners</S.OpenSeaStatsLabel>
				</S.OpenSeaStatsFigure>
			</S.OpenseaStatsOpacity>
		</S.OpenSeaStats>
	);
};
