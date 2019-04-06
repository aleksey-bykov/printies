import * as React from 'react';
import * as ReactDom from 'react-dom';
import { thusClock } from './clock';

const Clock = thusClock(50, 0.5, 0.65, 1.75);
class App extends React.Component {
    render() {
        return <Clock shortAt={3} longAt={45} />
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);