import * as React from 'react';
import { everying } from '../every';
import { allHoursAt, allMinutesAt } from './angles';
import { thusClock } from './clock';
import { Randomizer } from './random';

export interface ClockChallengerProps {
    randomizer: Randomizer;
}

export function thusClockChallenger() {
    const Clock = thusClock(50, 0.5, 0.7, 2);
    return class ClockChallenger extends React.Component<ClockChallengerProps> {
        render() {
            const { randomizer } = this.props;
            return everying()
                .instead(_ => {
                    const hourAt = randomizer.darePickOne(allHoursAt);
                    const minuteAt = randomizer.darePickOne(allMinutesAt);
                    const key = hourAt + minuteAt;
                    return [hourAt, minuteAt, key] as const;
                })
                .onlyUniqueAs(([, , key]) => key)
                .atMost(12)
                .instead(([hourAt, minuteAt, key]) => {
                    return <div key={key} className="challenge">
                        <Clock shortAt={hourAt} longAt={minuteAt} />
                    </div>
                })
                .toArray()
        }
    }
}