import * as React from 'react';
import { times } from './arrays';
import { Columnizer } from './columnizer';
import { broke } from './core';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';
import { $on, toStewardOf } from './stewarding';

export type WritingChallengerConcern =
    | { about: 'columns'; columns: NumberPickerConcern; }
    | { about: 'size'; size: NumberPickerConcern; }
    | { about: 'slots'; slots: NumberPickerConcern; }
    | { about: 'padding'; padding: NumberPickerConcern; };

export const inWritingChallengerProps = toStewardOf<WritingChallengerProps>();

export interface WritingChallengerProps {
    columns: number;
    size: number;
    slots: number;
    padding: number;
    regarding: Regarding<WritingChallengerConcern>;
}

const ColumnPicker = thusNumberPicker('Columns', 1, 10);
const FontSizePicker = thusNumberPicker('Font size', 8, 72);
const SlotsPicker = thusNumberPicker('Slots', 2, 40);
const PaddingPicker = thusNumberPicker('Padding', 0, 20);

export class WritingChallenger extends React.Component<WritingChallengerProps> {

    render() {
        const { columns, size, slots, padding } = this.props;
        const verticalPadding = padding;
        const horizontalPadding = padding * 2;
        const styles: React.CSSProperties = {
            fontSize: size,
            paddingTop: verticalPadding,
            paddingBottom: verticalPadding,
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding,
        };
        return <div>
            <ColumnPicker value={columns} regarding={this.regardingColumns} />
            <FontSizePicker value={size} regarding={this.regardingSize} />
            <SlotsPicker value={slots} regarding={this.regardingLines} />
            <PaddingPicker value={padding} regarding={this.regardingPadding} />
            <Columnizer
                columns={columns}
                stuff={times(slots, 1).map(index =>
                    <div key={index} className="writing-line" style={styles}>
                        <span className="writing-line-number">{index}.</span>
                    </div>
                )}
            />
        </div>;
    }

    private regardingColumns = (columns: NumberPickerConcern) => {
        this.props.regarding({ about: 'columns', columns });
    }

    private regardingSize = (size: NumberPickerConcern) => {
        this.props.regarding({ about: 'size', size });
    }

    private regardingLines = (slots: NumberPickerConcern) => {
        this.props.regarding({ about: 'slots', slots });
    }

    private regardingPadding = (padding: NumberPickerConcern) => {
        this.props.regarding({ about: 'padding', padding });
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
                    return inWritingChallengerProps.columns[$on](props, concern.columns.value);
                default: return broke(concern.columns.about);
            }
        }
        case 'size': {
            switch (concern.size.about) {
                case 'be-changed-number-value':
                    return inWritingChallengerProps.size[$on](props, concern.size.value);
                default: return broke(concern.size.about);
            }
        }
        case 'slots': {
            switch (concern.slots.about) {
                case 'be-changed-number-value':
                    return inWritingChallengerProps.slots[$on](props, concern.slots.value);
                default: return broke(concern.slots.about);
            }
        }
        case 'padding': {
            switch (concern.padding.about) {
                case 'be-changed-number-value':
                    return inWritingChallengerProps.padding[$on](props, concern.padding.value);
                default: return broke(concern.padding.about);
            }
        }
        default: return broke(concern);
    }
}
