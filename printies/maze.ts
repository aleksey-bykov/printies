import { times } from "./arrays";
import { Randomizer } from "./random";

export class MazeRandomizer {
    constructor(
        private randomizer: Randomizer,
    ) {

    }
    nextInteger(count: number) {
        return this.randomizer.lessThan(count);
    }
    nextBoolean() {
        return this.randomizer.flipCouin();
    }
    randomElement(list: number[]) {
        return list[this.randomizer.lessThan(list.length)];
    };
    removeRandomElement(list: number[]): number | undefined {
        const results = list.splice(this.randomizer.lessThan(list.length), 1);
        if (results) { return results[0]; }
        return undefined;
    };
    randomizeList<N extends number>(list: N[]) {
        let i = list.length - 1;
        while (i > 0) {
            const j = this.randomizer.lessThan(i + 1);
            [list[i], list[j]] = [list[j], list[i]];
            i--;
        }
        return list;
    };
    randomDirections(): MazeDir[] {
        return this.randomizeList(MazeDirection.List.slice(0));
    };
}

export const MazeDirection = {
    N: 0x01,
    S: 0x02,
    E: 0x04,
    W: 0x08,
    Mask: (0x01 | 0x02 | 0x04 | 0x08 | 0x10),
    List: [1, 2, 4, 8],
    dx: { 1: 0, 2: 0, 4: 1, 8: -1 },
    dy: { 1: -1, 2: 1, 4: 0, 8: 0 },
    opposite: { 1: 2, 2: 1, 4: 8, 8: 4 },
    cross: { 1: 4 | 8, 2: 4 | 8, 4: 1 | 2, 8: 1 | 2 }
} as const;

export type MazeDir = 1 | 2 | 4 | 8;

export class MazeGrid {
    constructor(
        public width: number,
        public height: number,
        public data = times(height).map(() => times(width).map(() => 0))
    ) {
    }

    at(x: number, y: number) { return this.data[y][x]; }
    mark(x: number, y: number, bits: number) { return this.data[y][x] |= bits; }
    clear(x: number, y: number, bits: number) { return this.data[y][x] &= ~bits; }
    isMarked(x: number, y: number, bits: number) { return (this.data[y][x] & bits) === bits; }
    isBlank(x: number, y: number) { return this.data[y][x] === 0; }
    isValid(x: number, y: number) { return (0 <= x && x < this.width) && (0 <= y && y < this.height); }

};
