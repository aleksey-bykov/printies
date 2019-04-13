import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Randomizer } from './random';
import { Mid, Tip } from './value-space';

const random = new Randomizer(10);
const mid = new Mid(0, 10, random, (min, max) => new Tip(min, max, random));

while (mid.hasMore()) {
    const drawn = mid.draw();
    console.log(drawn);
}

class App extends React.Component {
    render() {
        return <div></div>;
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);
