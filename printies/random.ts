import { becauseNoValues } from "./arrays";
import { fail, isNull } from "./core";

// https://en.wikipedia.org/wiki/Linear_congruential_generator

const m = 1 << 24;
const a = 1140671485;
const c = 12820163;
const d = 1000000;

function nextRandom(seed: number): number {
    const result = (a * seed + c) % m;
    return result % d;
}

export function nextRandomOver(seed: number): () => number {
    return () => {
        seed = nextRandom(seed);
        return seed / d;
    };
}
const boolean = [true, false];
export class Randomizer {
    constructor(private seed: number) {

    }
    flipCouin(): boolean {
        return this.darePickOne(boolean);
    }
    lessThan(count: number): number {
        return this.between(0, count - 1);
    }
    between(min: number, max: number): number {
        const random = this.seed = nextRandom(this.seed);
        const inversed = random / d;
        const span = max - min + 1;
        const result = min + Math.floor(span * inversed);
        return result;
    }
    darePickOne<T>(values: ReadonlyArray<T>): T {
        const result = this.pickOneOr(values, null);
        if (isNull(result)) return fail(becauseNoValues);
        return result;
    }
    pickOneOr<T, O>(values: ReadonlyArray<T>, or: O): T | O {
        if (values.length < 1) return or;
        const index = this.between(0, values.length - 1);
        return values[index];
    }
}
