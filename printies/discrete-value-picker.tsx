import * as React from 'react';
import { AreEqual, broke, to } from './core';
import { $across, toStewardOf } from './stewarding';

export type DiscreteValuePickerConcern<T> = { about: 'be-toggled-discrete-value', value: T };

export interface PickedOrNot<T> {
    value: T;
    isPicked: boolean;
}

export function toPickedOrNot<T>(values: ReadonlyArray<T>): ReadonlyArray<PickedOrNot<T>> {
    return values.map(value => to<PickedOrNot<T>>({value, isPicked: false}));
}

export interface DiscreteValuePickerProps<T> {
    items: ReadonlyArray<PickedOrNot<T>>;
    regarding: Regarding<DiscreteValuePickerConcern<T>>;
}

export function thusDiscreteValuePicker<T>(
    render: (value: T) => React.ReactNode,
) {

    return class DiscreteValuePicker extends React.Component<DiscreteValuePickerProps<T>> {
        render() {
            const { items, regarding } = this.props;
            return <div>
                {items.map(({ value, isPicked }) =>
                    <label>
                        <input type="checkbox" defaultChecked={isPicked} onChange={() => {
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
        default: return broke(concern.about);
    }
}

