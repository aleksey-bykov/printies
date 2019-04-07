import * as React from 'react';
import { times } from './arrays';
import { addClassIf } from './utils';

export interface MazerProps {
    height: number;
    width: number;
    toClassName: (x: number, y: number) => string;
}

export class Mazer extends React.Component<MazerProps> {
    render() {
        const { width, height, toClassName } = this.props;

        return <div className="maze">
            <div className={"grid"}>{
                times(height).map(y => {
                    const className = 'row'
                        + addClassIf(y === 0, 'as-first')
                        + addClassIf(y === height - 1, 'as-last');
                    return <div key={y}
                        className={className}>
                        {times(width).map(x => {
                            const className = toClassName(x, y)
                                + addClassIf(x === 0, 'as-first')
                                + addClassIf(x === width - 1, 'as-last');
                            return <div key={y + ',' + x} className={className} title={x + ',' + y}></div>
                        })}
                    </div>;
                })
            }</div>
        </div>;
    }
}
