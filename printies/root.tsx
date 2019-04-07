import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ArithmeticChallenger } from './arithmetic-challenger';
import { Challenge } from './challenge';
import { thusClockChallenger } from './clock-challenger';
import { Columnizer } from './columnizer';
import { broke, to } from './core';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { Randomizer } from './random';

interface State {
    challenge: Challenge;
    columnCount: number
}

export interface AppProps {
    randomizer: Randomizer;
}

const ClockChallenger = thusClockChallenger();
const ColumnNumberPicker = thusNumberPicker('Columns', 1, 8);

class App extends React.Component<AppProps, State> {

    state = to<State>({ challenge: 'arithmeic', columnCount: 2 });

    render() {
        const { columnCount } = this.state;
        return <>
            <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
            <Columnizer columns={columnCount} >
                {this.renderChallenger()}
            </Columnizer>
        </>;
    }

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.setState({ columnCount: concern.value });
    }

    private renderChallenger() {
        const { randomizer } = this.props;
        const { challenge } = this.state;
        switch (challenge) {
            case 'arithmeic': return <ArithmeticChallenger />;
            case 'clock': return <ClockChallenger randomizer={randomizer} />
            default: return broke(challenge);
        }
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App randomizer={new Randomizer(1)} />, rootElement);