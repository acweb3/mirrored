import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { SiteWrapper } from "./components/SiteWrapper";

export const App = () => {
	return (
		<SiteWrapper>
			<Header />
			<Body />
		</SiteWrapper>
	);
};
