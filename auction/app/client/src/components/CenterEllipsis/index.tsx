import { FC, useEffect, useRef, useState } from "react";

import { OverflowWrapper } from "./styled";

interface CenterEllipsisProps {
	className?: string;
	text: string;
	letterOffset?: number;
}
export const CenterEllipsis: FC<CenterEllipsisProps> = ({
	className,
	text,
	letterOffset = 5,
}) => {
	const [truncated, setTruncated] = useState("");

	// Ref to measure wrapper and content
	const ref = useRef<HTMLDivElement>(null);

	// If text or load state changes, reset truncated text.
	useEffect(() => {
		if (ref.current) {
			// Measure our wrapper and content
			const wrapper = ref.current;
			const content = ref.current.children[1] as HTMLSpanElement;
			const wrapperWidth = wrapper.offsetWidth;
			const contentWidth = content.offsetWidth;

			// If content is wider than wrapper, chop out middle.
			if (wrapperWidth <= contentWidth) {
				// Rough calculation on average letter width.
				const letterWidth = contentWidth / text.length;

				// Rough-ish take on how many letters should fit in wrapper.
				const maxLetters =
					Math.floor(wrapperWidth / letterWidth) - letterOffset;

				// Get right and left of ellipsis and combine with an ellipsis.
				const leftOfEllipsis = text.substring(
					0,
					Math.ceil(maxLetters / 2)
				);
				const rightOfEllipsis = text.substring(
					text.length - Math.floor(maxLetters / 2)
				);

				setTruncated(`${leftOfEllipsis}…${rightOfEllipsis}`);
			} else {
				setTruncated(text);
			}
		}
	}, [text, letterOffset]);

	return (
		<OverflowWrapper ref={ref}>
			<span className={className}>{truncated}</span>
			{/** This second hidden element is used for reference when calculating resizing. */}
			<span className={className}>{text}</span>
		</OverflowWrapper>
	);
};
