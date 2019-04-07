import { Maze, MazeDir, MazeDirection, MazeRandomizer } from './maze';

interface Step { x: number; y: number; dirs: MazeDir[]; }

export function backtracker(maze: Maze, rand: MazeRandomizer) {
    const stack = [] as Step[];
    const x = rand.nextInteger(maze.width)
    const y = rand.nextInteger(maze.height);
    console.log(x, y);
    stack.push({ x, y, dirs: rand.randomDirections() });

    while (true) {
        const last = stack[stack.length - 1];
        const dir = last.dirs.pop()!;

        const nx = last.x + MazeDirection.dx[dir];
        const ny = last.y + MazeDirection.dy[dir];
        if (maze.isValid(nx, ny) && maze.isBlank(nx, ny)) {
            const step = { x: nx, y: ny, dirs: rand.randomDirections() };
            stack.push(step);
            maze.carve(last.x, last.y, dir);
            maze.carve(nx, ny, MazeDirection.opposite[dir]);
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

