import { AnySpace } from "./any-space";
import { fail, isDefined, isNull, isUndefined } from "./core";
import { Randomizer } from "./random";

export class QualifiedMidSpace<T, C> {
    private exhausted?: Map<T, AnySpace<C>>;
    private vacant?: Map<T, AnySpace<C>>;
    constructor(
        private options: ReadonlyArray<T>,
        private random: Randomizer,
        private toChild: (value: T, random: Randomizer) => AnySpace<C>,
    ) {
    }
    hasMore() {
        const { options, exhausted, vacant } = this;
        if (isUndefined(vacant)) return true;

        let hasAtLeastOneVacant = false;
        for (let index = 0; index < options.length; index++) {
            const at = options[index];
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
        return this.exhausted = new Map<T, AnySpace<C>>();
    }
    private claimVacant() {
        if (isDefined(this.vacant)) return this.vacant;
        return this.vacant = new Map<T, AnySpace<C>>();
    }
    private claimVacantAt(at: T): AnySpace<C> {
        const { random } = this;
        const vacant = this.claimVacant();
        if (vacant.has(at)) return vacant.get(at)!;
        const child = this.toChild(at, random);
        vacant.set(at, child);
        return child;
    }
    draw(): [T, C] {
        const { exhausted, options, random } = this;

        const all = isDefined(exhausted)
            ? options.filter(value => !exhausted.has(value))
            : options;
        const at = random.pickOneOr(all, null);
        if (isNull(at)) return fail('!!!');
        const child = this.claimVacantAt(at);
        return [at, child.draw()];
    }
}
