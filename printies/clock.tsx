import * as React from 'react';
import { HourAt, MinuteAt } from './angles';
import { thusClockArrows } from './clock-arrows';
import { thusClockFace } from './clock-face';

export interface ClockProps {
    shortAt: HourAt;
    longAt: MinuteAt;
}

export function thusClock(radius: number, shortVsRadi: number, longVsRadi: number, dotRadius: number) {
    const ClockFace = thusClockFace(radius, dotRadius);
    const ClockArrows = thusClockArrows(radius, shortVsRadi, longVsRadi);
    return class Clock extends React.Component<ClockProps> {
        render() {
            const { shortAt, longAt } = this.props;
            const half = radius + dotRadius;
            const size = half * 2;
            return <svg width={size} height={size}>
                <g transform={`translate (${half}, ${half})`}>
                    <ClockFace />
                    <ClockArrows areHoursSticky={false} shortAt={shortAt} longAt={longAt} />
                </g>
            </svg>;
        }
    }
}