import * as React from 'react';
import { to } from './core';

export type ColumnNumberPickerConcern =
    | { about: 'be-changed-number-of-columns'; count: number; };

export interface ColumnNumberPickerProps {
    count: number;
    regarding: Regarding<ColumnNumberPickerConcern>;
}

export class ColumnNumberPicker extends React.Component<ColumnNumberPickerProps> {
    render() {
        const { count } = this.props;
        return <div className="no-print">
            Columns: {count} <input type="range" min={1} value={count} max={10} onChange={this.whenChanged} /> 
        </div>;
    }

    private whenChanged = (_e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.regarding({ about: 'be-changed-number-of-columns', count: parseInt(_e.currentTarget.value, 10) });
    }
}