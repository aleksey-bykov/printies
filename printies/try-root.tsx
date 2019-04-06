import * as React from 'react';
import * as ReactDom from 'react-dom';
import { thusClock } from './clock';

const Clock = thusClock(50, 0.5, 0.65);
class App extends React.Component {
    render() {
        return <svg>
            <g transform="translate(100, 100)">
                <Clock shortAt={3} longAt={45} />
            </g>
        </svg>;
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);