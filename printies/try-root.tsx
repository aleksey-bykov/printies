import * as React from 'react';
import * as ReactDom from 'react-dom';
import { thusClockArrows } from './clock-arrows';
import { thusClockFace } from "./clock-face";

const radius = 50;
const ClockFace = thusClockFace(radius);
const ClockArrows = thusClockArrows(radius, 0.5, 0.70);
class App extends React.Component {
    render() {
        return <svg>
            <g transform="translate(100, 100)">
                <ClockFace />
                <ClockArrows areHoursSticky={false} shortAt={2} longAt={55} />
            </g>
        </svg>;
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);