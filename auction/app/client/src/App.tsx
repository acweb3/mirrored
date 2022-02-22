import { BrowserRouter as Router } from "react-router-dom";

import { Content } from "components/Content";
import { SiteWrapper } from "components/SiteWrapper";
import { Providers } from "contexts/Providers";

export const App = () => {
	return (
		<Router>
			<Providers>
				<SiteWrapper>
					<Content />
				</SiteWrapper>
			</Providers>
		</Router>
	);
};
