import * as React from 'react';
import * as ReactDom from 'react-dom';
import { thusClockArrows } from './clock-arrows';
import { thusClockFace } from "./clock-face";

const radius = 50;
const ClockFace = thusClockFace(radius);
const ClockArrows = thusClockArrows(radius, 0.5, 0.75);
class App extends React.Component {
    render() {
        return <svg>
            <g transform="translate(100, 100)">
                <ClockFace />
                <ClockArrows shortAt={2} longAt={15} />
            </g>
        </svg>;
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);