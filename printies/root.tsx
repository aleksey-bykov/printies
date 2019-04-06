import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Arithmetic } from './arithmetic';
import { ColumnNumberPicker, ColumnNumberPickerConcern } from './column-number-picker';
import { to } from './core';
import { Columner } from './columner';

interface State { columnCount: number }

class App extends React.Component<{}, State> {

    state = to<State>({ columnCount: 2 });

    render() {
        const { columnCount } = this.state;
        return <>
            <ColumnNumberPicker count={columnCount} regarding={this.regardingColumnNumberPicker} />
            <Columner columns={columnCount} >
                <Arithmetic />
            </Columner>
        </>;
    }

    private regardingColumnNumberPicker = (concern: ColumnNumberPickerConcern) => {
        this.setState({ columnCount: concern.count });
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);