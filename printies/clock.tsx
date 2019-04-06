import * as React from 'react';
import { HourAt, MinuteAt } from './angles';
import { thusClockArrows } from './clock-arrows';
import { thusClockFace } from './clock-face';

export interface ClockProps {
    shortAt: HourAt;
    longAt: MinuteAt;
}

export function thusClock(radius: number) {
    const ClockFace = thusClockFace(radius);
    const ClockArrows = thusClockArrows(radius, 0.5, 0.70);
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