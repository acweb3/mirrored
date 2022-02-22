import * as S from "./styled";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { config } from "config";

import logoSrc from "assets/images/logo.png";

export const Header = () => {
	return (
		<S.HeaderContainer>
			<MobileNav />
			<S.LogoHeader>
				<S.HeaderWrapper>
					<S.LogoLink href={config.flagshipURL}>
						<S.Logo alt="logo" src={logoSrc} />
					</S.LogoLink>
				</S.HeaderWrapper>
			</S.LogoHeader>
			<DesktopNav />
		</S.HeaderContainer>
	);
};
