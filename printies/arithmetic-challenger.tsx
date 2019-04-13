import * as React from 'react';
import { Columnizer } from './columnizer';
import { broke } from "./core";
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { QualifiedMidSpace } from './qualified-mid-space';
import { QuantifiedRangedMidSpace } from './quantified-ranged-mid-space';
import { QuantifiedRangedTipSpace } from './quantified-ranged-tip-space';
import { Randomizer } from "./random";
import { randomizing } from './randomizing';
import { $on, toStewardOf } from './stewarding';

const digits = [0, 1, 2, 4, 5, 6, 7, 8, 9];
const operations = ['+' as const, '-' as const];

export type ArithmeticChallengerConcern =
    | { about: 'columns'; columns: NumberPickerConcern; }
    | { about: 'min'; min: NumberPickerConcern; }
    | { about: 'max'; max: NumberPickerConcern; }
    | { about: 'problems'; problems: NumberPickerConcern; };

export const inArithmeticChallengerProps = toStewardOf<ArithmeticChallengerProps>();
export interface ArithmeticChallengerProps {
    columnCount: number;
    randomizer: Randomizer;
    minNumber: MinNumberPickerProps;
    maxNumber: MaxNumberPickerProps;
    numberOfProblemsPicker: NumberOfProblemsPickerProps;
    regarding: Regarding<ArithmeticChallengerConcern>;
}

const ColumnNumberPicker = thusNumberPicker('Columns', 1, 8);

const MinNumberPicker = thusNumberPicker('Min number', 0, 100);
export type MinNumberPickerProps = typeof MinNumberPicker.Props;

const MaxNumberPicker = thusNumberPicker('Max number', 0, 100);
export type MaxNumberPickerProps = typeof MaxNumberPicker.Props;

const NumberOfProblemsPicker = thusNumberPicker('Number of problems', 0, 100);
export type NumberOfProblemsPickerProps = typeof NumberOfProblemsPicker.Props;
export class ArithmeticChallenger extends React.Component<ArithmeticChallengerProps> {

    private regardingColumnNumberPicker = (columns: NumberPickerConcern) => {
        this.props.regarding({ about: 'columns', columns });
    }

    render() {

        const { columnCount, randomizer, minNumber, maxNumber, numberOfProblemsPicker } = this.props;
        const space = new QuantifiedRangedMidSpace(
            minNumber.value, maxNumber.value, randomizer,
            (value, _min, _max, random) =>
                new QualifiedMidSpace(['-', '+'] as const, random, _operation =>
                    new QuantifiedRangedTipSpace(minNumber.value, value, random)
                )
        );
        return <div>
            <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
            <MinNumberPicker {...minNumber} />
            <MaxNumberPicker {...maxNumber} />
            <NumberOfProblemsPicker {...numberOfProblemsPicker} />
            <Columnizer columns={columnCount} >
                {randomizing(space)
                    .atMost(numberOfProblemsPicker.value)
                    .instead(([left, [operation, right]]) => {
                        const key = left + operation + right;
                        return <div key={key} className="challenge">{left} {operation} {right} = __</div>;
                    })
                    .toArray()}
            </Columnizer>
        </div>;
    }
}

export function faceArithmeticChallengerConcern(
    props: ArithmeticChallengerProps,
    concern: ArithmeticChallengerConcern,
): ArithmeticChallengerProps {
    switch (concern.about) {
        case 'columns': {
            switch (concern.columns.about) {
                case 'be-changed-number-value':
                    return inArithmeticChallengerProps.columnCount[$on](props, concern.columns.value);
                default: return broke(concern.columns.about);
            }
        }
        case 'min': {
            switch (concern.min.about) {
                case 'be-changed-number-value':
                    return inArithmeticChallengerProps.minNumber.value[$on](props, concern.min.value);
                default: return broke(concern.min.about);
            }
        }
        case 'max': {
            switch (concern.max.about) {
                case 'be-changed-number-value':
                    return inArithmeticChallengerProps.maxNumber.value[$on](props, concern.max.value);
                default: return broke(concern.max.about);
            }
        }
        case 'problems': {
            switch (concern.problems.about) {
                case 'be-changed-number-value':
                    return inArithmeticChallengerProps.numberOfProblemsPicker.value[$on](props, concern.problems.value);
                default: return broke(concern.problems.about);
            }
        }
        default: return broke(concern);
    }
}
