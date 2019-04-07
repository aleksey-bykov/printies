import * as React from 'react';
import { times } from './arrays';

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
                times(height).map(y =>
                    <div key={y} className='row'>
                        {times(width).map(x =>
                            <div key={y + ',' + x} className={toClassName(x, y)} title={x + ',' + y}></div>
                        )}
                    </div>
                )
            }</div>
        </div>;
    }
}