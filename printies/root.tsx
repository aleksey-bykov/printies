import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Arithmetic } from './arithmetic';

class App extends React.Component {
    render() {
        return <Arithmetic/>;
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);