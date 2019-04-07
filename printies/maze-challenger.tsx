import * as React from 'react';
import { backtracker } from './backtracker';
import { MazeDirection, MazeGrid, MazeRandomizer } from './maze';
import { Mazer, MazerProps } from './mazer';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { Randomizer } from "./random";

export interface MazeChallengerProps {
    randomizer: Randomizer;
}
interface State {
    width: number;
    height: number;
    mazer: MazerProps;
}
function toState(width: number, height: number): State {
    const seed = new Date().getTime();
    const grid = new MazeGrid(width, height);
    const rand = new MazeRandomizer(seed);
    backtracker(grid, rand);

    const mazer: MazerProps = {
        height, width,
        toClassName: (x, y) => {
            const classes: string[] = [];
            if (grid.isBlank(x, y)) return '';
            classes.push("in");
            if (grid.isMarked(x, y, MazeDirection.E)) { classes.push("e"); }
            if (grid.isMarked(x, y, MazeDirection.W)) { classes.push("w"); }
            if (grid.isMarked(x, y, MazeDirection.N)) { classes.push("n"); }
            if (grid.isMarked(x, y, MazeDirection.S)) { classes.push("s"); }
            return classes.join(' ');
        }
    };
    return { width, height, mazer }
}
const Width = thusNumberPicker('Width', 5, 50);
const Height = thusNumberPicker('Height', 5, 50);
export class MazeChallenger extends React.Component<MazeChallengerProps> {
    state = toState(20, 20);
    render() {
        const { mazer, width, height } = this.state;
        return <div>
            <Width value={width} regarding={this.regardingWidth} />
            <Height value={height} regarding={this.regardingHeight} />
            <Mazer {...mazer} />
        </div>;
    }

    private regardingWidth = (concern: NumberPickerConcern) => {
        const { height } = this.state;
        this.setState(toState(concern.value, height));
    }
    private regardingHeight = (concern: NumberPickerConcern) => {
        const { width } = this.state;
        this.setState(toState(width, concern.value));
    }
}
