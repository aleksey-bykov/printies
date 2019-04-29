import * as React from 'react';
import { Challenge } from './challenge';

export type ChallengePickerConcern =
    { about: 'be-picked-challege'; challenge: Challenge; };

export interface ChallengePickerProps {
    challenges: ReadonlyArray<Challenge>;
    regarding: Regarding<ChallengePickerConcern>
}

export class ChallengePicker extends React.Component<ChallengePickerProps> {
    render() {
        const { challenges } = this.props;
        return <div className="no-print">{
            challenges.map(challenge => {
                return <li key={challenge}>
                    <a href="" onClick={e => { this.whenPicked(e, challenge); }}>{challenge}</a>
                </li>;
            })
        }</div>;
    }

    private whenPicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, challenge: Challenge) => {
        e.preventDefault();
        this.props.regarding({ about: 'be-picked-challege', challenge });
    }
}
