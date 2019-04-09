import * as React from 'react';
import { allHours } from './hours-minutes';



export function thusClockFace(radius: number, dotRadius: number) {
    return class ClockFace extends React.Component {
        render() {
            const digitSize = radius * 0.25;
            const innerRadius = radius - digitSize + digitSize * 0.2;
            return <>
                {allHours.map((hour, index) => {
                    const alpha1 = -90 + index * 360 / allHours.length;
                    const alpha = alpha1 / 180 * Math.PI;
                    const x = radius * Math.cos(alpha);
                    const y = radius * Math.sin(alpha);
                    const textX = innerRadius * Math.cos(alpha);
                    const textY = innerRadius * Math.sin(alpha) + digitSize / 2.8;
                    return <React.Fragment key={hour}>
                        <circle cx={x} cy={y} r={dotRadius} />
                        <text x={textX} y={textY} fontSize={digitSize + 'px'} textAnchor="middle">{hour}</text>
                    </React.Fragment>;
                })}
                <circle r={radius} className="clock-circle" />
                <circle r={dotRadius} className="clock-middle-dot" />
            </>;
        }
    };
}
