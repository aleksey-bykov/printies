import * as React from 'react';
import { thusClockArrows } from './clock-arrows';
import { thusClockFace } from './clock-face';
import { ignore } from './core';
import { HourAt, Minute } from './hours-minutes';

export interface ClockProps {
    shortAt: HourAt | null;
    longAt: Minute | null;
    areHoursSticky: boolean;
    shouldDisplayMinutes: boolean;
}

export function thusClock(radius: number, shortVsRadi: number, longVsRadi: number, dotRadius: number) {
    const ClockFace = thusClockFace(radius, dotRadius);
    const ClockArrows = thusClockArrows(radius, shortVsRadi, longVsRadi);
    return class Clock extends React.Component<ClockProps> {
        render() {
            const { shortAt, longAt, areHoursSticky, shouldDisplayMinutes } = this.props;
            const hourDigitSize = radius * 0.25;
            const minuteDigitSize = radius * 0.15;
            const half = radius + dotRadius + (shouldDisplayMinutes ? minuteDigitSize * 1.4 : 0);
            const size = half * 2;
            return <svg width={size} height={size}>
                <g transform={`translate (${half}, ${half})`}>
                    <ClockFace shouldDisplayMinutes={shouldDisplayMinutes} regarding={ignore} hourDigitSize={hourDigitSize} minuteDigitSize={minuteDigitSize} />
                    <ClockArrows areHoursSticky={areHoursSticky} shortAt={shortAt} longAt={longAt} />
                </g>
            </svg>;
        }
    }
}
