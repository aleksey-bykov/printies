import * as React from 'react';
import { chunkHorizontally, times } from './arrays';

export interface ColumnizerProps {
    columns: number;
    stuff: React.ReactNodeArray;
}
export class Columnizer extends React.Component<ColumnizerProps> {
    render() {
        const { stuff, columns } = this.props;
        const rows = chunkHorizontally(stuff, columns);
        const size = rows.length > 0 ? rows[0].length : 0;
        return <div className="rows">
            {rows.map((row, rowIndex) =>
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) =>
                        <div key={rowIndex + '-' + cellIndex} className="cell">{cell}</div>
                    )}
                    {
                        row.length < size
                            ? times(size - row.length).map(() => <div className="cell as-empty"></div>)
                            : null
                    }
                </div>
            )}
        </div>
    }
}
