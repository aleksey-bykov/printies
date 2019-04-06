import * as React from 'react';
import { degreeToRadi, hourToDegrees, minuteToDegrees } from './angles';

export type HourAt = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type MinuteAt = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55;

export interface ClockArrowsProps {
    radius: number;
    shortAt: HourAt;
    shortVsR: number;
    longAt: MinuteAt;
    longVsR: number;
}

export class ClockArrows extends React.Component<ClockArrowsProps> {
    render() {
        const { shortAt, shortVsR, longAt, longVsR, radius } = this.props;

        const shortRadius = radius * shortVsR;
        const shortAlpha = degreeToRadi(hourToDegrees(shortAt));
        const shortX = Math.cos(shortAlpha) * shortRadius;
        const shortY = Math.sin(shortAlpha) * shortRadius;

        const longRadius = radius * longVsR;
        const longAlpha = degreeToRadi(minuteToDegrees(longAt));
        const longX = Math.cos(longAlpha) * longRadius;
        const longY = Math.sin(longAlpha) * longRadius;

        return <>
            <line className="clock-arrow as-big" x1={0} y1={0} x2={shortX} y2={shortY} />
            <line className="clock-arrow as-small" x1={0} y1={0} x2={longX} y2={longY} />
        </>;
    }
}