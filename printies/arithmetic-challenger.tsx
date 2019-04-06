import * as React from 'react';
import { everying } from "../every";
import { broke, maxOf2, minOf2 } from "./core";
import { Randomizer } from "./random";

const random = new Randomizer(1);

const digits = [0, 1, 2, 4, 5, 6, 7, 8, 9];
const operations = ['+' as const, '-' as const];

export interface ArithmeticChallengerProps {
}

export class ArithmeticChallenger extends React.Component<ArithmeticChallengerProps> {
    
    render() {
        return everying()
            .instead(_ => {
                const one = random.darePickOne(digits);
                const another = random.darePickOne(digits);
                const operation = random.darePickOne(operations);
                let left: number
                let right: number;
                switch (operation) {
                    case '-':
                        left = maxOf2(one, another);
                        right = minOf2(one, another);
                        break;
                    case '+':
                        left = one;
                        right = another;
                        break;
                    default: return broke(operation);
                }
                return [left, operation, right, left + operation + right] as const;
            })
            .onlyUniqueAs(([, , , key]) => key)
            .atMost(100)
            .instead(([left, operation, right, key]) => {
                return <div key={key} className="challenge">{left} {operation} {right} = __</div>;
            })
            .toArray();
    }
}