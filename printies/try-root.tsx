import * as React from 'react';
import * as ReactDom from 'react-dom';
import { QualifiedMidSpace } from './qualified-mid-space';
import { QuantifiedRangedMidSpace } from './quantified-ranged-mid-space';
import { QuantifiedRangedTipSpace } from './quantified-ranged-tip-space';
import { Randomizer } from './random';

const random = new Randomizer(10);
const mid = new QuantifiedRangedMidSpace(
    0, 10, random,
    (value, _min, _max, random) =>
        new QualifiedMidSpace(['-', '+'] as const, random, _operation =>
            new QuantifiedRangedTipSpace(0, value, random)
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
