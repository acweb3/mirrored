const boxShadowColor = "0deg 0% 0%";

export const shadows = {
	low: `
    0.6px 0.5px 0.7px hsl(${boxShadowColor} / 0.1),
    0.9px 0.7px 1px -1.9px hsl(${boxShadowColor} / 0.08),
    2.2px 1.6px 2.5px -3.9px hsl(${boxShadowColor} / 0.05);`,
	medium: `
    0.6px 0.5px 0.7px hsl(${boxShadowColor} / 0.11),
    1.4px 1.1px 1.6px -1.3px hsl(${boxShadowColor} / 0.09),
    4px 3.1px 4.6px -2.6px hsl(${boxShadowColor} / 0.07),
    10.8px 8.2px 12.4px -3.9px hsl(${boxShadowColor} / 0.05);`,
	high: `
    0.6px 0.5px 0.7px hsl(${boxShadowColor} / 0.1),
    1.6px 1.2px 1.8px -0.6px hsl(${boxShadowColor} / 0.09),
    3.1px 2.3px 3.5px -1.1px hsl(${boxShadowColor} / 0.08),
    5.7px 4.3px 6.5px -1.7px hsl(${boxShadowColor} / 0.07),
    10.2px 7.8px 11.7px -2.2px hsl(${boxShadowColor} / 0.07),
    17.4px 13.4px 20.1px -2.8px hsl(${boxShadowColor} / 0.06),
    28.1px 21.5px 32.4px -3.3px hsl(${boxShadowColor} / 0.05),
    42.8px 32.8px 49.3px -3.9px hsl(${boxShadowColor} / 0.04);`,
};
