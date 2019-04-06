import * as React from 'react';
import { HourAt, MinuteAt } from './angles';
import { thusClockArrows } from './clock-arrows';
import { thusClockFace } from './clock-face';

export interface ClockProps {
    shortAt: HourAt;
    longAt: MinuteAt;
}

export function thusClock(radius: number, shortVsRadi: number, longVsRadi: number) {
    const ClockFace = thusClockFace(radius);
    const ClockArrows = thusClockArrows(radius, shortVsRadi, longVsRadi);
        return class Clock extends React.Component<ClockProps> {
        render() {
            const {shortAt, longAt} = this.props;
            return <>
                <ClockFace />
                <ClockArrows areHoursSticky={false} shortAt={shortAt} longAt={longAt} />
            </>;
        }
    }
}