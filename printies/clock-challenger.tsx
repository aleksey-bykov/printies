import * as React from 'react';
import { allHoursAt, allMinutesAt } from './angles';
import { thusClock } from './clock';
import { Columnizer } from './columnizer';
import { broke } from './core';
import { everying } from './every';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { Randomizer } from './random';
import { $on, toStewardOf } from './stewarding';


export type ClockChallengerConcern = NumberPickerConcern;

export const inClockChallengerProps = toStewardOf<ClockChallengerProps>();
export interface ClockChallengerProps {
    columnCount: number;
    randomizer: Randomizer;
    regarding: Regarding<ClockChallengerConcern>
}

const ColumnNumberPicker = thusNumberPicker('Columns', 1, 8);
const Clock = thusClock(50, 0.5, 0.7, 2);

export class ClockChallenger extends React.Component<ClockChallengerProps, never> {

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.props.regarding(concern);
    }

    render() {
        const { randomizer, columnCount } = this.props;
        return <Columnizer columns={columnCount} >
            <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
            {everying()
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
                    </div>;
                })
                .toArray()
            }
        </Columnizer>;
    }
}

export function faceClockChallengerConcern(
    props: ClockChallengerProps,
    concern: ClockChallengerConcern,
): ClockChallengerProps {
    switch(concern.about) {
        case 'be-changed-number-value': {
            return inClockChallengerProps.columnCount[$on](props, concern.value);
        }
        default: return broke(concern.about);
    }
}
