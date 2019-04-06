import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ClockFace } from "./clock-face";

class App extends React.Component {
    render() {
        return <svg>
            <g transform="translate(100, 100)">
                <ClockFace />
            </g>
        </svg>;
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);