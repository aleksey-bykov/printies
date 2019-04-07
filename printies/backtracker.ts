import { MazeAlgorithm, MazeAlgorithms, MazeDir, MazeDirection } from './maze';

type State = 'START' | 'RUN' | 'DONE';

interface Step { x: number; y: number; dirs: MazeDir[]; }

export class RecursiveBacktracker extends MazeAlgorithm {

    IN = 0x1000;
    STACK = 0x2000;

    state: State = 'START';
    stack = [] as Step[];
    carvedOnLastStep = false;

    step(): boolean {
        switch (this.state) {
            case 'START': this.startStep(); break;
            case 'RUN': this.runStep(); break;
        }

        return this.state !== 'DONE';
    }

    startStep() {
        const x = this.rand.nextInteger(this.maze.width)
        const y = this.rand.nextInteger(this.maze.height);
        this.maze.carve(x, y, this.IN | this.STACK);
        this.updateAt(x, y);
        this.stack.push({ x, y, dirs: this.rand.randomDirections() });
        this.state = 'RUN';
        return this.carvedOnLastStep = true;
    }

    runStep(): void {
        while (true) {
            const current = this.stack[this.stack.length - 1];
            const dir = current.dirs.pop()!;

            const nx = current.x + MazeDirection.dx[dir];
            const ny = current.y + MazeDirection.dy[dir];

            if (this.maze.isValid(nx, ny)) {
                if (this.maze.isBlank(nx, ny)) {
                    this.stack.push({ x: nx, y: ny, dirs: this.rand.randomDirections() });
                    this.maze.carve(current.x, current.y, dir);
                    this.updateAt(current.x, current.y);

                    this.maze.carve(nx, ny, MazeDirection.opposite[dir] | this.STACK);
                    this.updateAt(nx, ny);
                    if (!this.carvedOnLastStep) { this.eventAt(nx, ny); }
                    this.carvedOnLastStep = true;
                    break;

                } else if (this.canWeave(dir, nx, ny)) {
                    this.performWeave(dir, current.x, current.y, (x, y) => {
                        this.stack.push({ x, y, dirs: this.rand.randomDirections() });
                        if (!this.carvedOnLastStep) { this.eventAt(x, y); }
                        return this.maze.carve(x, y, this.STACK);
                    });
                    this.carvedOnLastStep = true;
                    break;
                }
            }

            if (current.dirs.length === 0) {
                this.maze.uncarve(current.x, current.y, this.STACK);
                this.updateAt(current.x, current.y);
                if (this.carvedOnLastStep) { this.eventAt(current.x, current.y); }
                this.stack.pop();
                this.carvedOnLastStep = false;
                break;
            }
        }

        if (this.stack.length === 0) {
            this.state = 'DONE';
            return;
        }
    }

    isStack(x: number, y: number) {
        return this.maze.isSet(x, y, this.STACK);
    }
}

MazeAlgorithms.RecursiveBacktracker = RecursiveBacktracker;