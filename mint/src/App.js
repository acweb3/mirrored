import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { SiteWrapper } from "./components/SiteWrapper";
import { Contexts } from "./contexts";

export const App = () => {
	return (
		<Contexts>
			<SiteWrapper>
				<Header />
				<Body />
			</SiteWrapper>
		</Contexts>
	);
};
