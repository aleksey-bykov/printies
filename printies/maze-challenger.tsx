import * as React from 'react';
import { backtracker } from './backtracker';
import { broke } from './core';
import { MazeDirection, MazeGrid, MazeRandomizer } from './maze';
import { Mazer, MazerProps } from './mazer';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { Randomizer } from "./random";
import { $atop, toStewardOf } from './stewarding';


export type MazeChallengerConcern =
    | { about: 'width'; width: NumberPickerConcern; }
    | { about: 'height'; height: NumberPickerConcern; };

export interface MazeChallengerProps {
    width: number;
    height: number;
    mazer: MazerProps;
    regarding: Regarding<MazeChallengerConcern>
}

export function toMazerProps(
    width: number, height: number,
    randomizer: Randomizer,
): MazerProps {
    const grid = new MazeGrid(width, height);
    const rand = new MazeRandomizer(randomizer);
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
    return mazer;
}
const Width = thusNumberPicker('Width', 5, 50);
const Height = thusNumberPicker('Height', 5, 50);

export class MazeChallenger extends React.Component<MazeChallengerProps> {
    render() {
        const { mazer, width, height } = this.props;
        return <div>
            <Width value={width} regarding={this.regardingWidth} />
            <Height value={height} regarding={this.regardingHeight} />
            <Mazer {...mazer} />
        </div>;
    }

    private regardingWidth = (concern: NumberPickerConcern) => {
        this.props.regarding({ about: 'width', width: concern });
    }
    private regardingHeight = (concern: NumberPickerConcern) => {
        this.props.regarding({ about: 'height', height: concern });
    }
}
export const inMazeChallengerProps = toStewardOf<MazeChallengerProps>();
export function faceMazeChallengerConcern(
    props: MazeChallengerProps,
    concern: MazeChallengerConcern,
    randomizer: Randomizer,
): MazeChallengerProps {
    switch(concern.about) {
        case 'width': return inMazeChallengerProps[$atop](props, {
            mazer: toMazerProps(concern.width.value, props.height, randomizer),
            width: concern.width.value,
        });
        case 'height': return inMazeChallengerProps[$atop](props, {
            mazer: toMazerProps(props.width, concern.height.value, randomizer),
            height: concern.height.value,
        })
        default: return broke(concern);
    }
}
