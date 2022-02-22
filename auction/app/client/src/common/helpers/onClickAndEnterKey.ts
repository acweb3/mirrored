import React from "react";

export const onClickAndEnterKey = (
	callback: (e: React.MouseEvent | React.KeyboardEvent) => void
): {
	onClick: (e: React.MouseEvent) => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
} => ({
	onClick: callback,
	onKeyDown: (e: React.KeyboardEvent): void => {
		if (e.key === "Enter") {
			e.preventDefault();
			callback(e);
		}
	},
});
