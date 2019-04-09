export function isNull<T extends ([null] extends [T] ? any : never)>(value: T): value is T & null {
    return value === null;
}
export function fail(message: string): never {
    throw new Error(message);
}
export function maxOf2(left: number, right: number): number {
    return left > right ? left : right;
}
export function maxOf4(one: number, two: number, three: number, four: number): number {
    return maxOf2(maxOf2(one, two), maxOf2(three, four));
}
export function minOf2(left: number, right: number): number {
    return left < right ? left : right;
}
export function broke(_: never): never {
    return fail('This cannot be.');
}
export function to<T>(value: T): T { return value; }
export type AreEqual<T> = (one: T, another: T) => boolean;

export function ignore(): void { }

export function areNumbersEqual<N extends number>(one: N, another: N): boolean {
    return one === another;
}

export function not(isIt:boolean): boolean {
    return !isIt;
}
