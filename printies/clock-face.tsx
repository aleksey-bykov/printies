import * as React from 'react';

const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export interface ClockFaceProps {
}

export function thusClockFace(radius: number) {
    return class ClockFace extends React.Component<ClockFaceProps> {
        render() {
            const digitSize = radius * 0.25;
            const innerRadius = radius - digitSize + digitSize * 0.2;
            return <>
                {hours.map((hour, index) => {
                    const alpha1 = -90 + index * 360 / hours.length;
                    const alpha = alpha1 / 180 * Math.PI;
                    const x = radius * Math.cos(alpha);
                    const y = radius * Math.sin(alpha);
                    const textX = innerRadius * Math.cos(alpha);
                    const textY = innerRadius * Math.sin(alpha) + digitSize / 2.8;
                    return <React.Fragment key={hour}>
                        <circle cx={x} cy={y} r={2} />
                        <text x={textX} y={textY} fontSize={digitSize + 'px'} textAnchor="middle">{hour}</text>
                    </React.Fragment>;
                })}
                <circle r={radius} className="clock-circle" />
                <circle r={2} className="clock-middle-dot" />
            </>;
        }
    };
}