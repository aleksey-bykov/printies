import * as React from 'react';
import { times } from './arrays';
import { toDefaultMazeOptions } from './maze';


const options = toDefaultMazeOptions(1);
export interface MazerProps {
    height: number;
    width: number;
    toClassName: (x: number, y: number) => string;
}

export class Mazer extends React.Component<MazerProps> {
    render() {
        const { width, height, toClassName } = this.props;
        const mazeClass = ["maze medium"];
        if (options.class) { mazeClass.push(options.class); }

        const gridClass = ["grid"];
        if (options.wallwise) { gridClass.push("invert"); }
        if (options.padded) { gridClass.push("padded"); }

        return <div className={mazeClass.join(' ')}>
            <div className={gridClass.join(' ')}>{
                times(height).map(y =>
                    <div key={y} className='row'>
                        {times(width).map(x =>
                            <div key={y + ',' + x} className={toClassName(x, y)}>
                                {options.padded
                                    ? <>
                                        <div className='np'></div>
                                        <div className='wp'></div>
                                        <div className='ep'></div>
                                        <div className='sp'></div>
                                        <div className='c'></div>
                                    </>
                                    : null
                                }
                            </div>
                        )}
                    </div>
                )
            }</div>
        </div>;
    }
}