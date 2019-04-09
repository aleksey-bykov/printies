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
