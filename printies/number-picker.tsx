import * as React from 'react';

export type NumberPickerConcern =
    | { about: 'be-changed-number-value'; value: number; };

export interface NumberPickerProps {
    value: number;
    regarding: Regarding<NumberPickerConcern>;
}

export function thusNumberPicker(label: string, min: number, max: number) {

    return class NumberPicker extends React.Component<NumberPickerProps> {
        render() {
            const { value } = this.props;
            return <div className="no-print">
                {label}: {value} <input type="range" min={min} value={value} max={max} onChange={this.whenChanged} />
            </div>;
        }

        private whenChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.currentTarget.value, 10);
            this.props.regarding({ about: 'be-changed-number-value', value });
        }
    }
}