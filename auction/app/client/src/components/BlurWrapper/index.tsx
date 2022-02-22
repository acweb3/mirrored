import React, { useEffect, useRef, useState } from "react";
import { useActiveImageContext } from "contexts/ActiveImage";

import * as S from "./styled";

export const BlurWrapper: React.FC = ({ children }) => {
	const { activeImage } = useActiveImageContext();
	const [lock, setLock] = useState<any | undefined>(undefined);
	const lockRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		if (activeImage !== undefined) {
			setLock(window.scrollY);
			lockRef.current = window.scrollY;
		} else {
			setLock(undefined);
		}
	}, [activeImage]);

	useEffect(() => {
		if (!lock && lockRef.current) {
			window.scrollTo({ top: lockRef.current });
			lockRef.current = undefined;
		}
	}, [lock]);

	return (
		<S.HeightWrapper lock={lock}>
			<S.BlurWrapper lock={lock}>{children}</S.BlurWrapper>
		</S.HeightWrapper>
	);
};
