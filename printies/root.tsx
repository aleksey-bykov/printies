import * as React from 'react';
import * as ReactDom from 'react-dom';

class App extends React.Component {
    render() {
        return <div>Hi</div>;
    }
}

const rootElement = document.getElementById('root');

ReactDom.render(<App />, rootElement);