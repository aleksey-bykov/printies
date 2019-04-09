import * as React from 'react';
import { broke } from './core';
import { allHours, allMinutes } from './hours-minutes';
import { toStewardOf } from './stewarding';

export type ClockFaceConcern = { about: '' };

export const inClockFaceProps = toStewardOf<ClockFaceProps>();

export interface ClockFaceProps {
    shouldDisplayMinutes: boolean;
    hourDigitSize: number;
    minuteDigitSize: number;
    regarding: Regarding<ClockFaceConcern>;
}

export function faceClockFaceConcern(
    props: ClockFaceProps,
    concern: ClockFaceConcern,
): ClockFaceProps {
    switch (concern.about) {
        case '': {
            return props;
        }
        default: return broke(concern.about);
    }
}

export function thusClockFace(radius: number, dotRadius: number) {
    return class ClockFace extends React.Component<ClockFaceProps> {
        render() {
            const { shouldDisplayMinutes, hourDigitSize, minuteDigitSize } = this.props;
            const innerRadius = radius - hourDigitSize + hourDigitSize * 0.2;
            const outerRadius = radius + minuteDigitSize + minuteDigitSize * 0.2;
            return <>
                {allHours.map((hour, index) => {
                    const degrees = -90 + index * 360 / allHours.length;
                    const radians = degrees / 180 * Math.PI;
                    const x = radius * Math.cos(radians);
                    const y = radius * Math.sin(radians);
                    const textX = innerRadius * Math.cos(radians);
                    const textY = innerRadius * Math.sin(radians) + hourDigitSize / 2.8;
                    return <React.Fragment key={hour}>
                        <circle cx={x} cy={y} r={dotRadius} />
                        <text x={textX} y={textY} fontSize={hourDigitSize + 'px'} textAnchor="middle">{hour}</text>
                    </React.Fragment>;
                })}
                {shouldDisplayMinutes ? allMinutes.map((minute, index) => {
                    const degrees = -90 + index * 360 / allHours.length;
                    const radians = degrees / 180 * Math.PI;
                    const x = radius * Math.cos(radians);
                    const y = radius * Math.sin(radians);
                    const textX = outerRadius * Math.cos(radians);
                    const textY = outerRadius * Math.sin(radians) + minuteDigitSize / 2.8;
                    return <React.Fragment key={minute}>
                        <circle cx={x} cy={y} r={dotRadius} />
                        <text x={textX} y={textY} fontSize={minuteDigitSize + 'px'} textAnchor="middle">{minute}</text>
                    </React.Fragment>;
                }) : null}
                <circle r={radius} className="clock-circle" />
                <circle r={dotRadius} className="clock-middle-dot" />
            </>;
        }
    };
}
