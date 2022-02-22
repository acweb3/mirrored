import * as S from "./styled";
import { config } from "config";

export const DesktopNav = () => {
	return (
		<S.DesktopNavContainer>
			<S.LinksList>
				<S.LinkItem>
					<S.Link href={config.flagshipURL}>Home</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/prints`}>
						Prints
					</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/landscapes`}>
						Landscapes
					</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/lifestyle`}>
						Lifestyle{" "}
					</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/portraits`}>
						Portraits
					</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/commercial`}>
						Commercial
					</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/real`}>
						Real Estate
					</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/about`}>
						About Me
					</S.Link>
				</S.LinkItem>

				<S.LinkItem>
					<S.Link href={`${config.flagshipURL}/contact`}>
						Contact
					</S.Link>
				</S.LinkItem>
			</S.LinksList>
		</S.DesktopNavContainer>
	);
};
