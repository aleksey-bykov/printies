import * as React from 'react';
import { checkIfAllSomeOrNone } from './arrays';
import { AreEqual, broke, to } from './core';
import { HalfwayCheckbox } from './halfway-checkbox';
import { $across, $on, toStewardOf } from './stewarding';

export type DiscreteValuePickerConcern<T> =
    | { about: 'be-toggled-discrete-value', value: T }
    | { about: 'be-toggled-all-discrete-values' };

export interface PickedOrNot<T> {
    value: T;
    isPicked: boolean;
}

export function toPickedOrNot<T>(values: ReadonlyArray<T>, isPicked: boolean): ReadonlyArray<PickedOrNot<T>> {
    return values.map(value => to<PickedOrNot<T>>({ value, isPicked }));
}

export interface DiscreteValuePickerProps<T> {
    items: ReadonlyArray<PickedOrNot<T>>;
    regarding: Regarding<DiscreteValuePickerConcern<T>>;
}


export function thusDiscreteValuePicker<T>(
    label: string,
    render: (value: T) => React.ReactNode,
) {

    return class DiscreteValuePicker extends React.Component<DiscreteValuePickerProps<T>> {
        render() {
            const { items, regarding } = this.props;
            const thatMany = checkIfAllSomeOrNone(items, item => item.isPicked);
            const isChecked = thatMany === 'all' ? true : thatMany === 'none' ? false : undefined;
            const isIntermediate = thatMany === 'all' ? undefined : thatMany === 'none' ? undefined : true;
            return <div>
                {label}:
                <label>
                    <HalfwayCheckbox type="checkbox" checked={isChecked} indeterminate={isIntermediate} onChange={() => {
                        regarding({ about: 'be-toggled-all-discrete-values' });
                    }} />
                    All
                </label>
                {items.map(({ value, isPicked }, index) =>
                    <label key={index} className="off">
                        <input type="checkbox" checked={isPicked} onChange={() => {
                            regarding({ about: 'be-toggled-discrete-value', value })
                        }} />
                        {render(value)}
                    </label>
                )}
            </div>;
        }
    }
}
export function faceDiscreteValuePickerConcern<T>(
    props: DiscreteValuePickerProps<T>,
    areEqual: AreEqual<T>,
    concern: DiscreteValuePickerConcern<T>,
): DiscreteValuePickerProps<T> {
    const inDiscreteValuePickerProps = toStewardOf<DiscreteValuePickerProps<T>>();
    const inPickedOrNot = toStewardOf<PickedOrNot<T>>();
    switch (concern.about) {
        case 'be-toggled-discrete-value': {
            return inDiscreteValuePickerProps.items[$across](
                props,
                items => items.map(
                    item => areEqual(item.value, concern.value)
                        ? to<typeof item>({ value: item.value, isPicked: !item.isPicked })
                        : item
                )
            );
        }
        case 'be-toggled-all-discrete-values': {
            const { items } = props;
            const thatMany = checkIfAllSomeOrNone(items, item => item.isPicked);
            switch (thatMany) {
                case 'all': return inDiscreteValuePickerProps.items[$across](
                    props, items => items.map(item => inPickedOrNot.isPicked[$on](item, false))
                );
                case 'none': return inDiscreteValuePickerProps.items[$across](
                    props, items => items.map(item => inPickedOrNot.isPicked[$on](item, true))
                );
                case 'some': return inDiscreteValuePickerProps.items[$across](
                    props, items => items.map(item => inPickedOrNot.isPicked[$on](item, false))
                )
                default: return broke(thatMany);
            }
        }
        default: return broke(concern);
    }
}

