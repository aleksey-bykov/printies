import * as React from 'react';
import { thusClock } from './clock';
import { Columnizer } from './columnizer';
import { areNumbersEqual, broke, maxOf4 } from './core';
import { DiscreteValuePickerConcern, DiscreteValuePickerProps, faceDiscreteValuePickerConcern, thusDiscreteValuePicker } from './discrete-value-picker';
import { everying } from './every';
import { Hour, Minute } from './hours-minutes';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { Randomizer } from './random';
import { $across, $on, toStewardOf } from './stewarding';

export type ClockChallengerConcern =
    | NumberPickerConcern
    | { about: 'hours'; hours: DiscreteValuePickerConcern<Hour>; }
    | { about: 'minutes'; minutes: DiscreteValuePickerConcern<Minute>; };

export const inClockChallengerProps = toStewardOf<ClockChallengerProps>();

export interface ClockChallengerProps {
    columnCount: number;
    randomizer: Randomizer;
    hours: DiscreteValuePickerProps<Hour>;
    minutes: DiscreteValuePickerProps<Minute>;
    regarding: Regarding<ClockChallengerConcern>;
}

const ColumnNumberPicker = thusNumberPicker('Columns', 1, 8);
const Clock = thusClock(50, 0.5, 0.7, 2);
const Hours = thusDiscreteValuePicker<number>('Hours', x => x.toString());
const Minutes = thusDiscreteValuePicker<number>('Minutes', x => x.toString());
export class ClockChallenger extends React.Component<ClockChallengerProps, never> {

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.props.regarding(concern);
    }

    render() {
        const { randomizer, hours, minutes, columnCount } = this.props;
        const allowedHours = hours.items.filter(x => x.isPicked).map(x => x.value === 12 ? 0 : x.value);
        const allowedMinutes = minutes.items.filter(x => x.isPicked).map(x => x.value);
        return <div>
            <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
            <Hours {...hours} />
            <Minutes {...minutes} />

            <Columnizer columns={columnCount} >
                {everying()
                    .instead(_ => {
                        const hourAt = randomizer.pickOneOr(allowedHours, null);
                        const minuteAt = randomizer.pickOneOr(allowedMinutes, null);
                        const key = hourAt + ':' + minuteAt;
                        return [hourAt, minuteAt, key] as const;
                    })
                    .onlyUniqueAsUpto(([, , key]) => key, maxOf4(
                        allowedHours.length * allowedMinutes.length,
                        allowedHours.length, allowedMinutes.length,
                        1
                    ))
                    .atMost(12)
                    .instead(([hourAt, minuteAt, key]) => {
                        return <div key={key} className="challenge">
                            <Clock shortAt={hourAt} longAt={minuteAt} />
                        </div>;
                    })
                    .toArray()
                }
            </Columnizer>
        </div>;
    }
}

export function faceClockChallengerConcern(
    props: ClockChallengerProps,
    concern: ClockChallengerConcern,
): ClockChallengerProps {
    switch (concern.about) {
        case 'be-changed-number-value': {
            return inClockChallengerProps.columnCount[$on](props, concern.value);
        }
        case 'hours': {
            return inClockChallengerProps.hours[$across](
                props, hours => faceDiscreteValuePickerConcern(
                    hours, areNumbersEqual, concern.hours
                )
            );
        }
        case 'minutes': {
            return inClockChallengerProps.minutes[$across](
                props, minutes => faceDiscreteValuePickerConcern(
                    minutes, areNumbersEqual, concern.minutes,
                )
            );
        }
        default: return broke(concern);
    }
}
