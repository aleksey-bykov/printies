import * as React from 'react';

const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export class ClockFace extends React.Component {
    render() {
        const r = 50;
        const s = r * 0.25;
        const ir = r - s + 3;
        const xxx = 1.0;
        return <>
            {hours.map((hour, index) => {
                const alpha1 = -90 + index * 360 / hours.length;
                const alpha = alpha1 / 180 * Math.PI;
                const x = r * xxx * Math.cos(alpha);
                const y = r * xxx * Math.sin(alpha);
                const textX = ir * Math.cos(alpha);
                const textY = ir * Math.sin(alpha) + s / 3;
                return <React.Fragment key={hour}>
                    <circle cx={x} cy={y} r={2} />
                    <text x={textX} y={textY} fontSize={s + 'px'} textAnchor="middle">{hour}</text>
                </React.Fragment>;
            })}
            <circle r={r} className="clock-circle" />
        </>;
    }
}