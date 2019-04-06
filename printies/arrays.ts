export function times(count: number): number[] {
    const result: number[] = [];
    for (let index = 0; index < count; index ++) {
        result.push(index);
    }
    return result;
}

export const becauseNoValues = 'No values.';