import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Randomizer } from './random';
import { Mid, Mid1, Tip } from './value-space';

const random = new Randomizer(10);
const mid = new Mid(
    0, 10, random,
    (value, _min, _max, random) =>
        new Mid1(['-', '+'], random, _operation =>
            new Tip(0, value, random)
        )
);

let count = 0;
while (mid.hasMore()) {
    const [left, [operation, right]] = mid.draw();
    console.log(left, operation, right);
    count += 1;
}
console.log(count);

class App extends React.Component {
    render() {
        return <div></div>;
    }
}
const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);
