import { times } from "./arrays";
import * as React from 'react';

export class Arithmetic extends React.Component {
    render() {
        return times(10).map(index => {
            return <div key={index}>{index}</div>
        });
    }
}