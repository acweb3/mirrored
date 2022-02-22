import { css, FlattenSimpleInterpolation } from "styled-components";

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

type BreakpointsCSSMap = {
	[key in 'extraSmall' | 'small' | 'medium' | 'large']: (
		...args: any[]
	) => FlattenSimpleInterpolation;
};

export const breakpoints: BreakpointsCSSMap = Object.entries(breakpointsMap).reduce<BreakpointsCSSMap>(
	(acc, [key, breakpoint]) => ({
		...acc,
		[key]: (...args: any[]) =>
			css`
				@media (min-width: ${breakpoint}) {
					${css(args[0], ...args.slice(1))}
				}
			`,
	}),
	{} as BreakpointsCSSMap
);
