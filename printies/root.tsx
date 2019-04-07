import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ArithmeticChallenger } from './arithmetic-challenger';
import { allChalleges, Challenge } from './challenge';
import { ChallengePicker, ChallengePickerConcern } from './challenge-picker';
import { thusClockChallenger } from './clock-challenger';
import { Columnizer } from './columnizer';
import { broke, to } from './core';
import { MazeChallenger } from './maze-challenger';
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
        return <>
            <ChallengePicker challenges={allChalleges} regarding={this.regardingChallengePicker} />
            {this.renderChallenger()}
        </>;
    }

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.setState({ columnCount: concern.value });
    }

    private regardingChallengePicker = (concern: ChallengePickerConcern) => {
        this.setState({ challenge: concern.challenge });
    }

    private renderChallenger(): React.ReactNode {
        const { randomizer } = this.props;
        const { challenge, columnCount } = this.state;
        switch (challenge) {
            case 'arithmeic': return <Columnizer columns={columnCount} >
                <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
                <ArithmeticChallenger />
            </Columnizer>;
            case 'clock': return <Columnizer columns={columnCount} >
                <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
                <ClockChallenger randomizer={randomizer} />
            </Columnizer>;
            case 'maze': return <MazeChallenger randomizer={randomizer} />
            default: return broke(challenge);
        }
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App randomizer={new Randomizer(1)} />, rootElement);