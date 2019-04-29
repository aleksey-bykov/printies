export const allChalleges = ['arithmeic', 'clock', 'maze', 'writing'] as const;
export type Challenge = typeof allChalleges[number];
