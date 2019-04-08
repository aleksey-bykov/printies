import * as React from 'react';
import { Columnizer } from './columnizer';
import { broke, maxOf2, minOf2 } from "./core";
import { everying } from "./every";
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { Randomizer } from "./random";
import { $on, toStewardOf } from './stewarding';

const digits = [0, 1, 2, 4, 5, 6, 7, 8, 9];
const operations = ['+' as const, '-' as const];

export type ArithmeticChallengerConcern = NumberPickerConcern;

export const inArithmeticChallengerProps = toStewardOf<ArithmeticChallengerProps>();
export interface ArithmeticChallengerProps {
    columnCount: number;
    randomizer: Randomizer;
    regarding: Regarding<ArithmeticChallengerConcern>;
}

const ColumnNumberPicker = thusNumberPicker('Columns', 1, 8);

export class ArithmeticChallenger extends React.Component<ArithmeticChallengerProps> {

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.props.regarding(concern);
    }

    render() {

        const { columnCount, randomizer } = this.props;

        return <Columnizer columns={columnCount} >
            <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
            {everying()
                .instead(_ => {
                    const one = randomizer.darePickOne(digits);
                    const another = randomizer.darePickOne(digits);
                    const operation = randomizer.darePickOne(operations);
                    let left: number
                    let right: number;
                    switch (operation) {
                        case '-':
                            left = maxOf2(one, another);
                            right = minOf2(one, another);
                            break;
                        case '+':
                            left = one;
                            right = another;
                            break;
                        default: return broke(operation);
                    }
                    return [left, operation, right, left + operation + right] as const;
                })
                .onlyUniqueAs(([, , , key]) => key)
                .atMost(100)
                .instead(([left, operation, right, key]) => {
                    return <div key={key} className="challenge">{left} {operation} {right} = __</div>;
                })
                .toArray()}
        </Columnizer>;
    }
}

export function faceArithmeticChallengerConcern(
    props: ArithmeticChallengerProps,
    concern: ArithmeticChallengerConcern,
): ArithmeticChallengerProps {
    switch(concern.about) {
        case 'be-changed-number-value': {
            return inArithmeticChallengerProps.columnCount[$on](props, concern.value);
        }
        default: return broke(concern.about);
    }
}
