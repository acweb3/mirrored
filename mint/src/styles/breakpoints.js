import { css } from "styled-components";

export const breakpointExtraSmall = "634px";
export const breakpointSmall = "768px";
export const breakpointMedium = "1024px";
export const breakpointLarge = "1280px";

const breakpointsMap = {
	extraSmall: breakpointExtraSmall,
	small: breakpointSmall,
	medium: breakpointMedium,
	large: breakpointLarge,
};

export const breakpoints = Object.entries(breakpointsMap).reduce(
	(acc, [key, breakpoint]) => ({
		...acc,
		[key]: (...args) =>
			css`
				@media (min-width: ${breakpoint}) {
					${css(args[0], ...args.slice(1))}
				}
			`,
	}),
	{}
);
