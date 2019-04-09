import * as React from 'react';
import { isNull } from './core';

export interface HalfwayCheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
        indeterminate?: boolean;
}

export class HalfwayCheckbox extends React.Component<HalfwayCheckboxProps> {

    componentDidMount() {
        if (this.props.indeterminate === true) {
            this._setIndeterminate(true);
        }
    }

    componentDidUpdate(previousProps) {
        if (previousProps.indeterminate !== this.props.indeterminate) {
            this._setIndeterminate(this.props.indeterminate);
        }
    }

    _setIndeterminate(indeterminate) {
        const {inputElement} = this;
        if (isNull(inputElement)) return;
        inputElement.indeterminate = indeterminate;
    }

    private inputElement: HTMLInputElement | null = null;

    render() {
        const { indeterminate, type, ...props } = this.props;
        return <input ref={ref => this.inputElement = ref} type="checkbox" {...props} />;
    }
}
