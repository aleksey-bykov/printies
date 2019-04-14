import * as React from 'react';
import { chunkHorizontally } from './arrays';

export interface ColumnizerProps {
    columns: number;
    stuff: React.ReactNodeArray;
}
export class Columnizer extends React.Component<ColumnizerProps> {
    render() {
        const { stuff, columns } = this.props;
        const rows = chunkHorizontally(stuff, columns);
        return <div className="rows">
            {rows.map((row, rowIndex) =>
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) =>
                        <div key={rowIndex + '-' + cellIndex} className="cell">{cell}</div>
                    )}
                </div>
            )}
        </div>
    }
}
