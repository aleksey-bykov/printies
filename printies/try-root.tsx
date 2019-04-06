import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ClockArrows } from './clock-arrows';
import { ClockFace } from "./clock-face";

class App extends React.Component {
    render() {
        const r = 50;
        return <svg>
            <g transform="translate(100, 100)">
                <ClockFace radius={r} />
                <ClockArrows radius={r} shortAt={2} shortVsR={0.50} longAt={15} longVsR={0.70} />
            </g>
        </svg>;
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);