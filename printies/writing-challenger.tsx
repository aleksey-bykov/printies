import * as React from 'react';
import { broke } from './core';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { $on, toStewardOf } from './stewarding';

export type WritingChallengerConcern =
    | { about: 'columns'; columns: NumberPickerConcern; };

export const inWritingChallengerProps = toStewardOf<WritingChallengerProps>();

export interface WritingChallengerProps {
    columnCount: number;
    regarding: Regarding<WritingChallengerConcern>;
}

const ColumnPicker = thusNumberPicker('Columns', 1, 3);
export class WritingChallenger extends React.Component<WritingChallengerProps> {
    render() {
        const {
            columnCount
        } = this.props;
        return <div>
            <ColumnPicker value={columnCount} regarding={this.regardingColumnNumber} />
        </div>;
    }

    private regardingColumnNumber = (columns: NumberPickerConcern) => {
        this.props.regarding({ about: 'columns', columns });
    }
}

export function faceWritingChallengerConcern(
    props: WritingChallengerProps,
    concern: WritingChallengerConcern,
): WritingChallengerProps {
    switch (concern.about) {
        case 'columns': {
            switch (concern.columns.about) {
                case 'be-changed-number-value':
                    return inWritingChallengerProps.columnCount[$on](props, concern.columns.value);
                default: return broke(concern.columns.about);
            }
        }
        default: return broke(concern.about);
    }
}
