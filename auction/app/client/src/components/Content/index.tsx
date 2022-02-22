import { BlurWrapper } from "components/BlurWrapper";
import { Paintings } from "components/Paintings";
import { Profile } from "components/Profile";
import { Header } from "components/Header";
import { Sidebar } from "components/Sidebar";
import { useActiveImageContext } from "contexts/ActiveImage";

export const Content = () => {
	const { activeImage } = useActiveImageContext();

	return (
		<>
			<BlurWrapper>
				<Header />
				<Paintings />
				<Profile />
			</BlurWrapper>

			{activeImage !== undefined && <Sidebar painting={activeImage} />}
		</>
	);
};
