import React from "react";
import jazzicon from "@metamask/jazzicon";

interface AvatarProps {
	className?: string;
	account: string;
	width: number;
}
export const Avatar: React.FC<AvatarProps> = ({
	className,
	account,
	width,
}) => {
	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{
				__html: jazzicon(width, parseInt(account.slice(2, 10), 16))
					.outerHTML,
			}}
		/>
	);
};
