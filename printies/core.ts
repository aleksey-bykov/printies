export function isNull<T extends ([null] extends [T] ? any : never)>(value: T): value is T & null {
    return value === null;
}
export function fail(message: string): never {
    throw new Error(message);
}
export function maxOf2(left: number, right: number): number {
    return left > right ? left : right;
}
export function minOf2(left: number, right: number): number {
    return left < right ? left : right;
}
export function broke(_: never): never {
    return fail('This cannot be.');
}
export function to<T>(value: T): T { return value; }