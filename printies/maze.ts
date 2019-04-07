import { Randomizer } from "./random";

class MazeRandomizer {
    constructor(
        seed: number,
        private randomizer = new Randomizer(seed),
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

export interface MazeOptions {
    seed: number;
    weave: boolean;
    interval: number;
    class: string | undefined;
    wallwise: boolean;
    padded: boolean;
    input: number;
}
export function toDefaultMazeOptions(input: number): MazeOptions {
    return {
        interval: 50,
        class: undefined,
        padded: false,
        wallwise: false,
        seed: new Date().getTime(),
        weave: false,
        input
    };
}
export type MazeAlgorithmConstructor = new (maze: Maze, options: MazeOptions) => MazeAlgorithm
export type WhenMazeUpdated = (maze: Maze, x: number, y: number) => void;
export class Maze {
    public rand: MazeRandomizer;
    public algorithm: MazeAlgorithm;
    public isWeave = false;

    constructor(
        public width: number,
        public height: number,
        Algorithm: MazeAlgorithmConstructor,
        options: MazeOptions,
        public grid = new MazeGrid(width, height),
    ) {
        this.rand = new MazeRandomizer(options.seed);
        this.algorithm = new Algorithm(this, options);
        this.isWeave = options.weave;
    }

    onUpdate(fn: WhenMazeUpdated) { return this.algorithm.onUpdate(fn); }
    onEvent(fn: WhenMazeUpdated) { return this.algorithm.onEvent(fn); }

    generate() {
        while (true) {
            if (!this.step()) { break; }
        }
    }

    step() { return this.algorithm.step(); }

    isEast(x: number, y: number) { return this.grid.isMarked(x, y, MazeDirection.E); }
    isWest(x: number, y: number) { return this.grid.isMarked(x, y, MazeDirection.W); }
    isNorth(x: number, y: number) { return this.grid.isMarked(x, y, MazeDirection.N); }
    isSouth(x: number, y: number) { return this.grid.isMarked(x, y, MazeDirection.S); }
    isUnder(x: number, y: number) { return this.grid.isMarked(x, y, MazeDirection.U); }
    isValid(x: number, y: number) { return (0 <= x && x < this.width) && (0 <= y && y < this.height); }
    carve(x: number, y: number, dir: number) { return this.grid.mark(x, y, dir); }
    uncarve(x: number, y: number, dir: number) { return this.grid.clear(x, y, dir); }
    isSet(x: number, y: number, dir: number) { return this.grid.isMarked(x, y, dir); }
    isBlank(x: number, y: number) { return this.grid.at(x, y) === 0; }
    isPerpendicular(x: number, y: number, dir: MazeDir) {
        return (this.grid.at(x, y) & MazeDirection.Mask) === MazeDirection.cross[dir];
    }
}

export const MazeAlgorithms: any = {};

export abstract class MazeAlgorithm {
    public updateCallback: WhenMazeUpdated = function () { };
    public eventCallback: WhenMazeUpdated = function () { };

    constructor(
        public maze: Maze,
        _options: MazeOptions,
        public rand = maze.rand
    ) {
    }

    abstract step(): boolean;

    onUpdate(fn: WhenMazeUpdated) { return this.updateCallback = fn; }
    onEvent(fn: WhenMazeUpdated) { return this.eventCallback = fn; }

    updateAt(x: number, y: number) {
        return this.updateCallback(this.maze, x, y);
    }
    eventAt(x: number, y: number) {
        return this.eventCallback(this.maze, x, y);
    }

    canWeave(dir: MazeDir, thruX: number, thruY: number) {
        if (this.maze.isWeave && this.maze.isPerpendicular(thruX, thruY, dir)) {
            const nx = thruX + MazeDirection.dx[dir];
            const ny = thruY + MazeDirection.dy[dir];
            return this.maze.isValid(nx, ny) && this.maze.isBlank(nx, ny);
        } else {
            return false;
        }
    }

    performThruWeave(thruX: any, thruY: any) {
        if (this.rand.nextBoolean()) {
            return this.maze.carve(thruX, thruY, MazeDirection.U);
        } else if (this.maze.isNorth(thruX, thruY)) {
            this.maze.uncarve(thruX, thruY, MazeDirection.N | MazeDirection.S);
            return this.maze.carve(thruX, thruY, MazeDirection.E | MazeDirection.W | MazeDirection.U);
        } else {
            this.maze.uncarve(thruX, thruY, MazeDirection.E | MazeDirection.W);
            return this.maze.carve(thruX, thruY, MazeDirection.N | MazeDirection.S | MazeDirection.U);
        }
    }

    performWeave(
        dir: MazeDir, fromX: number, fromY: number,
        callback: { (x: any, y: any): number; (arg0: any, arg1: any): void; }
    ) {
        const thruX = fromX + MazeDirection.dx[dir];
        const thruY = fromY + MazeDirection.dy[dir];
        const toX = thruX + MazeDirection.dx[dir];
        const toY = thruY + MazeDirection.dy[dir];

        this.maze.carve(fromX, fromY, dir);
        this.maze.carve(toX, toY, MazeDirection.opposite[dir]);

        this.performThruWeave(thruX, thruY);

        if (callback) { callback(toX, toY); }

        this.updateAt(fromX, fromY);
        this.updateAt(thruX, thruY);
        return this.updateAt(toX, toY);
    }
};

export const MazeDirection = {
    N: 0x01,
    S: 0x02,
    E: 0x04,
    W: 0x08,
    U: 0x10,
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
        width: number,
        height: number,
        public data = __range__(1, height, true)
            .map(_y => (__range__(1, width, true).map(_x => 0)))
    ) {
    }

    at(x: number, y: number) { return this.data[y][x]; }
    mark(x: number, y: number, bits: number) { return this.data[y][x] |= bits; }
    clear(x: number, y: number, bits: number) { return this.data[y][x] &= ~bits; }
    isMarked(x: number, y: number, bits: number) { return (this.data[y][x] & bits) === bits; }
};

function __range__(left: number, right: number, isInclusive: boolean): number[] {
    let range: number[] = [];
    let ascending = left < right;
    let end = !isInclusive ? right : ascending ? right + 1 : right - 1;
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
    }
    return range;
}