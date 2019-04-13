export function times(count: number): number[] {
    const result: number[] = [];
    for (let index = 0; index < count; index ++) {
        result.push(index);
    }
    return result;
}

export function timesOff(count: number, initial: number): number[] {
    const result: number[] = [];
    for (let index = 0; index < count; index ++) {
        result.push(initial + index);
    }
    return result;
}

export function countThoseThat<T>(
    values: ReadonlyArray<T>,
    isThat: (value: T, index: number) => boolean,
): number {
    let count = 0;
    for (let index = 0; index < values.length; index ++) {
        if (isThat(values[index], index)) {
            count += 1;
        }
    }
    return count;
}

export function checkIfAllSomeOrNone<T>(
    items: ReadonlyArray<T>,
    isIt: (value: T) => boolean,
): 'all' | 'some' | 'none' {
    const count = countThoseThat(items, isIt);
    if (count === items.length) return 'all';
    if (count === 0) return 'none';
    return 'some';
}

export const becauseNoValues = 'No values.';
