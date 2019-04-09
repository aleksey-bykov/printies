import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ArithmeticChallenger, ArithmeticChallengerConcern, ArithmeticChallengerProps, faceArithmeticChallengerConcern } from './arithmetic-challenger';
import { allChalleges, Challenge } from './challenge';
import { ChallengePicker, ChallengePickerConcern } from './challenge-picker';
import { ClockChallenger, ClockChallengerConcern, ClockChallengerProps, faceClockChallengerConcern } from './clock-challenger';
import { broke } from './core';
import { toPickedOrNot } from './discrete-value-picker';
import { allHours, allMinutes } from './hours-minutes';
import { faceMazeChallengerConcern, MazeChallenger, MazeChallengerConcern, MazeChallengerProps, toMazerProps } from './maze-challenger';
import { Randomizer } from './random';

interface State {
    challenge: Challenge;
    maze: MazeChallengerProps;
    arithmetic: ArithmeticChallengerProps;
    clock: ClockChallengerProps;
}

export interface AppProps {
    randomizer: Randomizer;
}

class App extends React.Component<AppProps, State> {

    private regardingMazeChallenger = (concern: MazeChallengerConcern) => {
        const { randomizer } = this.props;
        const { maze: olderMaze } = this.state;
        const newerMaze = faceMazeChallengerConcern(olderMaze, concern, randomizer);
        this.setState({ maze: newerMaze });
    }

    private regardingArithmeticChallenger = (concern: ArithmeticChallengerConcern) => {
        const { arithmetic: olderArithmetic } = this.state;
        const newerArithemtic = faceArithmeticChallengerConcern(olderArithmetic, concern);
        this.setState({ arithmetic: newerArithemtic });
    }

    private regardingClockChallenger = (concern: ClockChallengerConcern) => {
        const { clock: olderClock } = this.state;
        const newerClock = faceClockChallengerConcern(olderClock, concern);
        this.setState({ clock: newerClock });
    }

    toState = (): State => {
        const { randomizer } = this.props;
        const width = 20;
        const height = 20;
        const maze: MazeChallengerProps = {
            height, width, mazer: toMazerProps(width, height, randomizer),
            regarding: this.regardingMazeChallenger,
        };
        const arithmetic: ArithmeticChallengerProps = {
            randomizer,
            columnCount: 2,
            regarding: this.regardingArithmeticChallenger,
        };
        const clock: ClockChallengerProps = {
            randomizer,
            columnCount: 2,
            hours: {
                items: toPickedOrNot(allHours),
                regarding: hours => this.regardingClockChallenger({ about: 'hours', hours }),
            },
            minutes: {
                items: toPickedOrNot(allMinutes),
                regarding: minutes => this.regardingClockChallenger({ about: 'minutes', minutes }),
            },
            regarding: this.regardingClockChallenger,
        };
        return {
            challenge: 'arithmeic',
            maze, arithmetic, clock
        };
    }

    state = this.toState();


    render() {
        return <>
            <ChallengePicker challenges={allChalleges} regarding={this.regardingChallengePicker} />
            {this.renderChallenger()}
        </>;
    }

    private regardingChallengePicker = (concern: ChallengePickerConcern) => {
        this.setState({ challenge: concern.challenge });
    }

    private renderChallenger(): React.ReactNode {
        const { challenge, maze, arithmetic, clock } = this.state;
        switch (challenge) {
            case 'arithmeic': return <ArithmeticChallenger {...arithmetic} />;
            case 'clock': return <ClockChallenger {...clock} />;
            case 'maze': return <MazeChallenger {...maze} />
            default: return broke(challenge);
        }
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App randomizer={new Randomizer(1)} />, rootElement);
