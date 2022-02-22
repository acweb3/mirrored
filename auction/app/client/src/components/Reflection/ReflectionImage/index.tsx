import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

export const pullImage = async (index: number, fuzzy?: boolean) =>
	(
		await import(
			`assets/reflections/${
				fuzzy ? "fuzzy" : "sharp"
			}/reflection${index}.jpeg`
		)
	).default;

interface ReflectionImageProps {
	className?: string;
	index: number;
}
export const ReflectionImage: React.FC<ReflectionImageProps> = ({
	className,
	index,
}) => {
	const [imageSrc, setImageSrc] = useState<any | undefined>(undefined);
	const isSharpImageSet = useRef(false);

	const { ref, inView } = useInView({
		/* Optional options */
		threshold: 0.9,
	});

	useEffect(() => {
		(async () => {
			const fuzzySrc = await pullImage(index, true);

			if (isSharpImageSet.current === false) {
				setImageSrc(fuzzySrc);
			}
		})();
	}, [index]);

	useEffect(() => {
		(async () => {
			if (inView) {
				const sharpSrc = await pullImage(index);
				isSharpImageSet.current = true;
				setImageSrc(sharpSrc);
			}
		})();
	}, [index, inView]);

	return (
		<>
			{imageSrc && (
				<img
					alt={`reflection ${index}`}
					ref={ref}
					className={className}
					src={imageSrc}
				/>
			)}
		</>
	);
};
