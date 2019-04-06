import { times } from "./arrays";
import * as React from 'react';
import { nextRandomOver as randomOver } from "./random";

const random = randomOver(new Date().getTime());
export class Arithmetic extends React.Component {
    render() {
        return times(10).map(index => {
            return <div key={index}>{random()}</div>
        });
    }
}