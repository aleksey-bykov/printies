import * as React from 'react';
import { degreeToRadi, HourAt, hourToDegrees, MinuteAt, minuteToDegrees } from './angles';

export interface ClockArrowsProps {
    shortAt: HourAt;
    longAt: MinuteAt;
    areHoursSticky: boolean;
}

export function thusClockArrows(radius: number, shortVsR: number, longVsR: number) {
    return class ClockArrows extends React.Component<ClockArrowsProps> {
        render() {
            const { shortAt, longAt, areHoursSticky } = this.props;

            const shortRadius = radius * shortVsR;
            const shortDelta = areHoursSticky ? 0 : longAt / 60;
            const shortAlpha = degreeToRadi(hourToDegrees(shortAt + shortDelta));
            const shortX = Math.cos(shortAlpha) * shortRadius;
            const shortY = Math.sin(shortAlpha) * shortRadius;

            const longRadius = radius * longVsR;
            const longAlpha = degreeToRadi(minuteToDegrees(longAt));
            const longX = Math.cos(longAlpha) * longRadius;
            const longY = Math.sin(longAlpha) * longRadius;

            return <>
                <line className="clock-arrow as-big" x2={shortX} y2={shortY} />
                <line className="clock-arrow as-small" x2={longX} y2={longY} />
            </>;
        }
    }
}