
export type Every<T> = IterableIterator<T>;

export function* insteadEvery<T, U>(
    every: Every<T>,
    instead: (value: T) => U,
): IterableIterator<U> {
    for (const value of every) {
        yield instead(value);
    }
}

export function* everyNumber() {
    for (let index = 0; true; index++) {
        yield index;
    }
}

export function* onlyEvery<T>(
    every: Every<T>,
    seeIfThat: (value: T) => boolean,
): Every<T> {
    for (const value of every) {
        if (seeIfThat(value)) yield value;
    }
}

export function* atMostEvery<T>(
    every: Every<T>,
    count: number,
): Every<T> {
    let index = 0;
    for (const value of every) {
        if (index >= count) return;
        yield value;
        index += 1;
    }
}

export function *onlyEveryUniqueAs<T, U>(every: Every<T>, as: (value: T) => U): Every<T> {
    const seen = new Set<U>();
    for (const value of every) {
        const unlike = as(value);
        if (seen.has(unlike)) continue;
        seen.add(unlike);
        yield value;
    }
}

export class Everying<T> {
    
    constructor(
        private every: Every<T>
    ) {}

    instead<U>(instead: (value: T) => U): Everying<U> {
        return new Everying(insteadEvery(this.every, instead));
    }

    only(seeIfThat: (value: T) => boolean) {
        return new Everying(onlyEvery(this.every, seeIfThat));
    }

    onlyUniqueAs<U>(as: (value: T) => U) {
        return new Everying(onlyEveryUniqueAs(this.every, as));
    }
    
    toArray(): T[] {
        const result: T[] = [];
        for (const value of this.every) {
            result.push(value);
        }
        return result;
    }

    atMost(count: number): Everying<T> {
        return new Everying(atMostEvery(this.every, count));
    }
}

export function everying() {
    return new Everying(everyNumber());
}