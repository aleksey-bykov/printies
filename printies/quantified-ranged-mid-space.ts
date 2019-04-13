import { AnySpace } from "./any-space";
import { timesOff } from "./arrays";
import { fail, isDefined, isNull, isUndefined } from "./core";
import { Randomizer } from "./random";

export class QuantifiedRangedMidSpace<C> {
    private exhausted?: Map<number, AnySpace<C>>;
    private vacant?: Map<number, AnySpace<C>>;
    constructor(
        private min: number,
        private max: number,
        private random: Randomizer,
        private toChild: (value: number, min: number, max: number, random: Randomizer) => AnySpace<C>,
    ) {
    }
    hasMore() {
        const { min, max, exhausted, vacant } = this;
        if (isUndefined(vacant)) return true;
        const size = max - min + 1;
        let hasAtLeastOneVacant = false;
        for (let index = 0; index < size; index ++) {
            const at = min + index;
            if (vacant.has(at)) {
                const child = vacant.get(at)!;
                if (child.hasMore()) {
                    hasAtLeastOneVacant = true;
                } else {
                    vacant.delete(at);
                    const exhausted = this.claimExhausted();
                    exhausted.set(at, child);
                }
            } else if (isDefined(exhausted) && exhausted.has(at)) {
                // do nothing
            } else {
                hasAtLeastOneVacant = true;
            }
        }
        return hasAtLeastOneVacant;
    }
    private claimExhausted() {
        if (isDefined(this.exhausted)) return this.exhausted;
        return this.exhausted = new Map<number, AnySpace<C>>();
    }
    private claimVacant() {
        if (isDefined(this.vacant)) return this.vacant;
        return this.vacant = new Map<number, AnySpace<C>>();
    }
    private claimVacantAt(at: number): AnySpace<C> {
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
