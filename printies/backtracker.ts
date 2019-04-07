import { MazeDir, MazeDirection, MazeGrid, MazeRandomizer } from './maze';

interface Step { x: number; y: number; dirs: MazeDir[]; }

export function backtracker(grid: MazeGrid, rand: MazeRandomizer) {
    const stack = [] as Step[];
    const x = rand.nextInteger(grid.width)
    const y = rand.nextInteger(grid.height);
    console.log(x, y);
    stack.push({ x, y, dirs: rand.randomDirections() });

    while (true) {
        const last = stack[stack.length - 1];
        const dir = last.dirs.pop()!;

        const nx = last.x + MazeDirection.dx[dir];
        const ny = last.y + MazeDirection.dy[dir];
        if (grid.isValid(nx, ny) && grid.isBlank(nx, ny)) {
            const step = { x: nx, y: ny, dirs: rand.randomDirections() };
            stack.push(step);
            grid.mark(last.x, last.y, dir);
            grid.mark(nx, ny, MazeDirection.opposite[dir]);
            continue;
        } else {
            if (last.dirs.length === 0) {
                stack.pop();
            }
            if (stack.length < 1) {
                return;
            }
        }
    }
}

