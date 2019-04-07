import { Maze, MazeDir, MazeDirection } from './maze';

interface Step { x: number; y: number; dirs: MazeDir[]; }



const IN = 0x1000;
const STACK = 0x2000;



export function backtracker(maze: Maze) {
    const { rand } = maze;
    const stack = [] as Step[];
    const x = rand.nextInteger(maze.width)
    const y = rand.nextInteger(maze.height);

    maze.carve(x, y, IN | STACK);

    stack.push({ x, y, dirs: rand.randomDirections() });

    while (true) {
        const current = stack[stack.length - 1];
        const dir = current.dirs.pop()!;

        const nx = current.x + MazeDirection.dx[dir];
        const ny = current.y + MazeDirection.dy[dir];

        if (maze.isValid(nx, ny)) {
            if (maze.isBlank(nx, ny)) {
                stack.push({ x: nx, y: ny, dirs: rand.randomDirections() });
                maze.carve(current.x, current.y, dir);
                maze.carve(nx, ny, MazeDirection.opposite[dir] | STACK);
            }
        }

        if (current.dirs.length === 0) {
            maze.uncarve(current.x, current.y, STACK);
            stack.pop();
        }

        if (stack.length < 1) {
            return;
        }
    }
}

