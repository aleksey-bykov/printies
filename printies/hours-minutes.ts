export const allHoursAt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type HourAt = typeof allHoursAt[number];

export const allHours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type Hour = typeof allHours[number];

export const allMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as const;
export type Minute = typeof allMinutes[number];
