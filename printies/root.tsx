import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ArithmeticChallenger } from './arithmetic-challenger';
import { Challenge } from './challenge';
import { Columnizer } from './columnizer';
import { broke, to } from './core';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';

interface State {
    challenge: Challenge;
    columnCount: number
}

export const ColumnNumberPicker = thusNumberPicker('Columns', 1, 8);

class App extends React.Component<{}, State> {

    state = to<State>({ challenge: 'arithmeic', columnCount: 2 });

    render() {
        const { columnCount } = this.state;
        return <>
            <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
            <Columnizer columns={columnCount} >
                {this.renderChallenge()}
            </Columnizer>
        </>;
    }

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.setState({ columnCount: concern.value });
    }

    private renderChallenge() {
        const {challenge} = this.state;
        switch(challenge) {
            case 'arithmeic': return <ArithmeticChallenger />;
            default: return broke(challenge);
        }
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);