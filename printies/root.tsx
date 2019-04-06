import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Arithmetic } from './arithmetic';
import { Columner } from './columner';
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
            <Columner columns={columnCount} >
                <Arithmetic />
            </Columner>
        </>;
    }

    private regardingColumnNumberPicker = (concern: NumberPickerConcern) => {
        this.setState({ columnCount: concern.value });
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);