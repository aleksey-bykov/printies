import * as React from 'react';
import * as ReactDom from 'react-dom';
import { RecursiveBacktracker } from './backtracker';
import { Maze, toDefaultMazeOptions } from './maze';
import { Mazer, MazerProps } from './mazer';

//const Clock = thusClock(50, 0.5, 0.65, 1.75);


const width = 20;
const height = 20;
const options = toDefaultMazeOptions(1);
const maze = new Maze(width, height, RecursiveBacktracker, options);

maze.generate();

class App extends React.Component {
    render() {
        const props: MazerProps = {
            height, width,
            toClassName: (x, y) => {
                const classes: string[] = [];
                if (maze.isBlank(x, y)) return '';
                classes.push("in");
                if (maze.isEast(x, y)) { classes.push("e"); }
                if (maze.isWest(x, y)) { classes.push("w"); }
                if (maze.isSouth(x, y)) { classes.push("s"); }
                if (maze.isNorth(x, y)) { classes.push("n"); }
                if (maze.isUnder(x, y)) { classes.push("u"); }
                return classes.join(' ');
            }
        };
        return <Mazer {...props} />
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);