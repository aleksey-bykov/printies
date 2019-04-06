export type HourAt = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type MinuteAt = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55;

export function hourToDegrees(hour: number): number {
    const result = -90 + hour * 360 / 12;
    return result;
}

export function minuteToDegrees(minute: number): number {
    const result = -90 + minute * 360 / 60;
    return result;
}

export function degreeToRadi(degree: number): number {
    return degree / 180 * Math.PI;
}