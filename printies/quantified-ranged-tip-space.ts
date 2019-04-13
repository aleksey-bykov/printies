import { fail, isNull, isUndefined } from "./core";
import { Randomizer } from "./random";

export class QuantifiedRangedTipSpace {
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
