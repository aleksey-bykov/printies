import { timesOff } from "./arrays";
import { fail, isDefined, isNull, isUndefined } from "./core";
import { Randomizer } from "./random";

type Child<T> = {
    draw(): T;
    hasMore(): boolean;
}

export class Mid<C> {
    private exhausted?: Map<number, Child<C>>;
    private vacant?: Map<number, Child<C>>;
    constructor(
        private min: number,
        private max: number,
        private random: Randomizer,
        private toChild: (value: number, min: number, max: number, random: Randomizer) => Child<C>,
    ) {
    }
    hasMore() {
        const { min, max, exhausted, vacant } = this;
        if (isUndefined(vacant)) return true;
        const size = max - min + 1;
        let atLeastOneVacant = false;
        for (let index = 0; index < size; index ++) {
            const at = min + index;
            if (vacant.has(at)) {
                const child = vacant.get(at)!;
                if (child.hasMore()) {
                    atLeastOneVacant = true;
                } else {
                    vacant.delete(at);
                    const exhausted = this.claimExhausted();
                    exhausted.set(at, child);
                }
            } else if (isDefined(exhausted) && exhausted.has(at)) {
                // do nothing
            } else {
                atLeastOneVacant = true;
            }
        }
        return atLeastOneVacant;
    }
    private claimExhausted() {
        if (isDefined(this.exhausted)) return this.exhausted;
        return this.exhausted = new Map<number, Child<C>>();
    }
    private claimVacant() {
        if (isDefined(this.vacant)) return this.vacant;
        return this.vacant = new Map<number, Child<C>>();
    }
    private claimVacantAt(at: number): Child<C> {
        const { min, max, random } = this;
        const vacant = this.claimVacant();
        if (vacant.has(at)) return vacant.get(at)!;
        const child = this.toChild(at, min, max, random);
        vacant.set(at, child);
        return child;
    }
    draw(): [number, C] {
        const { min, max, exhausted, random } = this;
        const size = max - min + 1;
        let all = timesOff(size, min);
        if (isDefined(exhausted)) {
            all = all.filter(value => !exhausted.has(value));
        }
        const at = random.pickOneOr(all, null);
        if (isNull(at)) return fail('!!!');
        const child = this.claimVacantAt(at);
        return [at, child.draw()];
    }
}

export class Tip {
    private ocupied?: Set<number>;
    constructor(
        private min: number,
        private max: number,
        private random: Randomizer,
    ) { }

    hasMore(): boolean {
        const { min, max, ocupied } = this;
        if (isUndefined(ocupied)) return true;
        const size = max - min + 1;
        return ocupied.size < size;
    }

    draw(): number {
        const { min, max, ocupied, random } = this;
        if (isUndefined(ocupied)) {
            const value = random.between(min, max);
            this.ocupied = new Set<number>();
            this.ocupied.add(value);
            return value;
        } else {
            const size = max - min + 1;
            const vacant: number[] = [];
            for (let index = 0; index < size; index ++) {
                const at = min + index;
                if (!ocupied.has(at)) {
                    vacant.push(at);
                }
            }
            const value = random.pickOneOr(vacant, null);
            if (isNull(value)) return fail('!!!');
            ocupied.add(value);
            return value;
        }
    }
}
