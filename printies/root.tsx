import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Arithmetic } from './arithmetic';
import { Columnizer } from './columnizer';
import { to } from './core';
import { NumberPickerConcern, thusNumberPicker } from './number-picker';

interface State { columnCount: number }

export const ColumnNumberPicker = thusNumberPicker('Columns', 1, 8);

class App extends React.Component<{}, State> {

    state = to<State>({ columnCount: 2 });

    render() {
        const { columnCount } = this.state;
        return <>
            <ColumnNumberPicker value={columnCount} regarding={this.regardingColumnNumberPicker} />
            <Columnizer columns={columnCount} >
                <Arithmetic />
            </Columnizer>
        </>;
    }

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.setState({ columnCount: concern.value });
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);