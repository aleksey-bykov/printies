import * as React from 'react';
import { degreeToRadi, hourToDegrees, minuteToDegrees } from './angles';
import { isNull } from './core';
import { HourAt, Minute } from './hours-minutes';

export interface ClockArrowsProps {
    shortAt: HourAt | null;
    longAt: Minute | null;
    areHoursSticky: boolean;
}

export function thusClockArrows(radius: number, shortVsR: number, longVsR: number) {
    return class ClockArrows extends React.Component<ClockArrowsProps> {
        render() {
            const { shortAt, longAt, areHoursSticky } = this.props;
            const shortRadius = radius * shortVsR;
            const longRadius = radius * longVsR;
            const shortDelta = areHoursSticky || isNull(longAt) ? 0 : longAt / 60;

            return <>
                {renderLong(longAt, longRadius)}
                {renderShort(shortAt, shortDelta, shortRadius)}
            </>;
        }
    }

    function renderShort(shortAt: number | null, shortDelta: number, shortRadius: number) {
        if (isNull(shortAt)) return null;
        const shortAlpha = degreeToRadi(hourToDegrees(shortAt + shortDelta));
        const shortX = Math.cos(shortAlpha) * shortRadius;
        const shortY = Math.sin(shortAlpha) * shortRadius;
        return <line className="clock-arrow as-big" x2={shortX} y2={shortY} />
    }

    function renderLong(longAt: number | null, longRadius: number) {
        if (isNull(longAt)) return null;
        const longAlpha = degreeToRadi(minuteToDegrees(longAt));
        const longX = Math.cos(longAlpha) * longRadius;
        const longY = Math.sin(longAlpha) * longRadius;
        return <line className="clock-arrow as-small" x2={longX} y2={longY} />;
    }
}
